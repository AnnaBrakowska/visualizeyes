import React, { Component } from "react";
import MainContainer from "./containers/MainContainer.jsx";
import LandingPage from "./containers/LandingPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        "mongodb://violent-hunters:123abc@ds143143.mlab.com:43143/violent-hunters",
      data: {},
      connected: false
    };
  }

  fetchOnClick() {
    fetch("/app")
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log("---------Response to client---------", res);
        this.setState({ connected: true });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <MainContainer data={this.state.data} />
        ) : (
          <LandingPage fetchOnClick={this.fetchOnClick} />
        )}
      </div>
    );
  }
}

export default App;
