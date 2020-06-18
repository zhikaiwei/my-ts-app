import axios, { AxiosResponse, Canceler } from "axios";
import Cookies from "js-cookie";
import { ObjectUtils } from "ts-commons";
import { RequestConfig } from "../interfaces/requestConfig";
import { ApiResponse } from "../interfaces/apiResponse";

const userId = ObjectUtils.getOrDefault(Cookies.get("userId"), "0");
const requestMap = new Map<symbol, Canceler>();

/**
 * request
 */
export async function request<T = any, R = AxiosResponse<T>>(config: RequestConfig): Promise<R> {
  const { requestId, abortContext, ...restConfig } = config;

  // withCredentials
  restConfig.withCredentials = ObjectUtils.getOrDefault(restConfig.withCredentials, true);

  // headers
  const myHeaders: any = ObjectUtils.getOrDefault(restConfig.headers, {});
  myHeaders.userId = ObjectUtils.getOrDefault(myHeaders.userId, userId);
  restConfig.headers = myHeaders;

  // cancel
  if (typeof requestId !== "undefined" || typeof abortContext !== "undefined") {
    if (typeof requestId !== "undefined" && requestMap.has(requestId)) {
      const c = requestMap.get(requestId);

      if (typeof c !== "undefined") {
        c("cancel");
      }

      requestMap.delete(requestId);
    }

    restConfig.cancelToken = new axios.CancelToken(cancel => {
      if (typeof requestId !== "undefined") {
        requestMap.set(requestId, cancel);
      }

      if (typeof abortContext !== "undefined") {
        abortContext.abort = () => {
          if (typeof requestId !== "undefined" && requestMap.has(requestId)) {
            requestMap.delete(requestId);
          }

          cancel("cancel");
        };
      }
    });
  }

  try {
    const r = await axios.request<T, R>(restConfig);

    return Promise.resolve(r);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * json
 */
export async function json<T = any>(config: RequestConfig): Promise<T> {
  try {
    const response = await request<T>(config);

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

/**
 * api
 */
export async function api<T = any>(config: RequestConfig): Promise<T> {
  try {
    const data = await json<ApiResponse<T>>(config);

    return Promise.resolve(data.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
