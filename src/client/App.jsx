import React, { Component } from "react";
import DbWindow from "./components/DbWindow.jsx";

import Entry from "./components/Entry.jsx";
require("./css/style.css");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      currentCollection: "services",
      data: [],
      connected: false,
      username: "neighborhoodguide",
      password: "26stmarksplace",
      authoPort: "27362",
      address: "ds127362.mlab.com",
      dbName: "neighborhood-guide",
      nested: false
    };

    this.connectHandler = this.connectHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.handleColClick = this.handleColClick.bind(this);
    this.handleNests = this.handleNests.bind(this);
  }

  handleColClick(e) {
    console.log(e.target);
    let collectionName = e.target.innerText;
    fetch(`/app/db/${collectionName}`)
      .then(res => res.json())
      .then(docs => {
        console.log("docs", docs);
        this.setState({ currCol: collectionName, data: docs });
      })
      .catch(err => console.log(err));
  }

  handleDocIdClick(e) {
    console.log(e.target);
  }

  logout() {
    this.setState({
      collections: [],
      currentCollection: "",
      data: [],
      connected: false,
      username: "neighborhoodguide",
      password: "26stmarksplace",
      authoPort: "27362",
      address: "ds127362.mlab.com",
      dbName: "neighborhood-guide"
    });
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
        this.setState({
          collections: data,
          username: "",
          password: "",
          authoPort: "",
          address: "",
          dbName: "",
          connected: !this.state.connected
        });
      })
      .catch(err => console.log(err));
  }

  handleNests(event) {
    event.preventDefault();
    const index = event.target.attributes.index.value;
    console.log(index);
    this.data[index];
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <DbWindow
            handleNests={this.handleNests}
            docData={this.state.data}
            currCol={this.state.currentCollection}
            logout={this.logout}
            collections={this.state.collections}
            handleColClick={this.handleColClick}
            handleDocIdClick={this.handleDocIdClick}
          />
        ) : (
          <Entry
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
