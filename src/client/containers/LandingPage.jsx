import React, { Component } from "react";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> VisualEyes </h1>
        <h3> Database GUI </h3>
        <input placeholder="URI search" />
        <button onClick={this.props.fetchOnClick}> Connect </button>
      </div>
    );
  }
}
