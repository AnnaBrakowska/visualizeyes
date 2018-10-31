import React, { Component } from "react";
import DbWindow from "./components/DbWindow.jsx";

import Entry from "./components/Entry.jsx";
require("./css/style.css");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      currCol: "",
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
    this.populateInitialData = this.populateInitialData.bind(this);
    this.updateDb = this.updateDb.bind(this);
  } 

  updateDb(edit) {
    const index = edit.namespace[0];
    const toUpdate = this.state.data[index]._id;
    const updateField = edit.name;
    const updateValue = edit.new_value;
    const newData = {};
    const docMod = edit.existing_src[index];
    delete docMod._id;
    newData[updateField] = updateValue;
    const colName = this.state.currCol;
    fetch(`/app/db/${colName}/${toUpdate}`, {
      method: "PUT",
      body: JSON.stringify({newData: newData, docMod: docMod}),
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log('ERROR:', err))
  }

  populateInitialData(cols) {
    let colName = cols[0].name;
    fetch(`/app/db/${colName}`)
    .then(res => res.json())
    .then(docs => {
      this.setState({ currCol: colName, data: docs });
    })
    .catch(err => console.log(err));
  }

  handleColClick(e) {
    let collectionName = e.target.innerText;
    fetch(`/app/db/${collectionName}`)
      .then(res => res.json())
      .then(docs => {
        this.setState({ currCol: collectionName, data: docs });
      })
      .catch(err => console.log(err));
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
        this.populateInitialData(data);
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

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <DbWindow
            updateDb={this.updateDb}
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
