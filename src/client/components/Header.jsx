import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="header">
        <div style={{ fontSize: "3rem" }}>VisualEyes</div>

        <div
          className="ui large red inverted button"
          onClick={this.props.logout}
        >
          Logout
        </div>
      </div>
    );
  }
}
