import React, { Component } from "react";
import VisualizeModal from "./VisualizeModal.jsx";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="header">
        <div className="logo">VisualEyesDB</div>
        <VisualizeModal />

        <div
          className="ui large yellow inverted button"
          onClick={this.props.logout}>
          Logout
        </div>
      </div>
    );
  }
}
