import React, { Component } from "react";

export default class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        // className="ui menu"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid lightgray",
          boxShadow: "1px 0.5px 1px 1px lightgray",
          padding: "1rem",
          background: "white"
        }}
      >
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
