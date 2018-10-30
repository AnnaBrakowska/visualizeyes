import React, { Component } from "react";
import DbWindow from "./components/DbWindow.jsx";
import LandingPage from "./components/LandingPage.jsx";



require("./css/style.css");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      currentCollection: 'services',
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
    this.handleColClick = this.handleColClick.bind(this);
  }

  handleColClick(e) {
    console.log(e.target);
    let collectionName = e.target.innerText;
    fetch(`/app/db/${collectionName}`)
    .then(res => res.json())
    .then(docs => {
      console.log('docs', docs);
      this.setState({ currCol: collectionName, data: docs })
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

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <DbWindow currCol={this.state.currentCollection} toggleConnected={this.toggleConnected}  collections={this.state.collections} handleColClick={this.handleColClick}/>
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
