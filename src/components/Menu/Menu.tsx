import React from "react";
import { Link } from "react-router-dom";

interface MeunProps {}
interface MeunState {}

class Meun extends React.Component<MeunProps, MeunState> {
  constructor(props: MeunProps) {
    super(props);
    this.state = {};
  }
  public render() {
    return (
      <div>
        <Link to="/home">Home</Link>/<Link to="/test">Test</Link>
      </div>
    );
  }
}
export default Meun;
