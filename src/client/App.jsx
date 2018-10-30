import React, { Component } from "react";
import MainContainer from "./containers/MainContainer.jsx";
import LandingPage from "./containers/LandingPage.jsx";
import FileContainer from "./containers/FileContainer.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      collections: [],
      data: [],
      connected: false,
      username: "",
      password: "",
      authoPort: "",
      address: "",
      dbName: ""
    };

    this.fetchOnClick = this.fetchOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchOnClick() {
    console.log(this.state.address);
    fetch("/app/db", {
      method: "POST",
      body: JSON.stringify({ address: this.state.address }),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(response =>
      // .catch(error => console.error("Error:", error));
      fetch("/app/getDB")
        .then(res => res.json())
        .then(res => {
          console.log("---------Response to client---------", res);
          this.setState({ connected: true });
        })
        .catch(err => console.log(err))
    );
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <MainContainer />
        ) : (
          <LandingPage
            handleChange={this.handleChange}
            fetchOnClick={this.fetchOnClick}
            dataToPass={this.state}
          />
        )}
      </div>
    );
  }
}

export default App;
