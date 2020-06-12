import React from "react";
import { Link } from "react-router-dom";
import { Button, Input, Tooltip, Menu, Dropdown } from "antd";

interface MeunProps {}
interface MeunState {}
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

class Meun extends React.Component<MeunProps, MeunState> {
  constructor(props: MeunProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div>
        <div style={{ margin: "20px", width: "120px" }}>
          <Button type="danger">Primary</Button>
          <br />
          <Input style={{ marginTop: "20px" }} />
          <Tooltip title="121212">
            <span>121221</span>
          </Tooltip>
          <Dropdown overlay={menu}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              Hover me
            </a>
          </Dropdown>
        </div>
        <Link to="/home">Home</Link>/<Link to="/test">Test</Link>
      </div>
    );
  }
}
export default Meun;
