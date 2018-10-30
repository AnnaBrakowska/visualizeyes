import React, { Component } from "react";
import DbWindow from "./components/DbWindow.jsx";
import LandingPage from "./components/LandingPage.jsx";

require("./css/style.css");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      data: [],
      connected: false,
      username: "neighborhoodguide",
      password: "26stmarksplace",
      authoPort: "27362",
      address: "ds127362.mlab.com",
      dbName: "neighborhood-guide"
    };

    this.connectHandler = this.connectHandler.bind(this);
    this.getDocumentsHandler = this.getDocumentsHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleConnected = this.toggleConnected.bind(this);
  }

  getDocumentsHandler() {
    fetch("/app/db")
      .then(res => res.json())
      .then(res => {
        console.log("Res", res);
        let keys = Object.keys(res);
        let vals = Object.values(res);
        console.log("keys", keys);
        console.log("vals", vals);
        this.setState({
          resKeys: keys,
          resVals: vals,
          connected: true
        });
      })
      .catch(err => console.log(err));
  }

  toggleConnected() {
    this.setState({ connected: !this.state.connected });
  }

  connectHandler() {
    fetch("/app/db", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        authoPort: this.state.authoPort,
        address: this.state.address,
        dbName: this.state.dbName
      }),
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(res => res.json())
      .then(data => {
        this.toggleConnected();
        this.setState({
          collections: data,
          username: "",
          password: "",
          authoPort: "",
          address: "",
          dbName: ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  // .then(response =>
  //   fetch("/app/getDB")
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log("---------Response to client---------", res);
  //       this.setState({ connected: true });
  //     })
  //     .catch(err => console.log(err))
  // );

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <DbWindow toggleConnected={this.toggleConnected} />
        ) : (
          <LandingPage
            handleChange={this.handleChange}
            connectHandler={this.connectHandler}
            dataToPass={this.state}
          />
        )}
      </div>
    );
  }
}

export default App;
