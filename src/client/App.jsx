import React, { Component } from "react";
import DbWindow from "./components/DbWindow.jsx";

import Entry from "./components/Entry.jsx";
require("./css/style.css");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      currentCollection: "",
      data: [],
      connected: false,
      username: "neighborhoodguide",
      password: "26stmarksplace",
      authoPort: "27362",
      address: "ds127362.mlab.com",
      dbName: "neighborhood-guide",
      visualizeArr: [],
    };

    this.connectHandler = this.connectHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.logout = this.logout.bind(this);
    this.handleColClick = this.handleColClick.bind(this);
    this.handleNests = this.handleNests.bind(this);
    this.populateInitialData = this.populateInitialData.bind(this);
  }

//   toggleClass() {
//     const currentState = this.state.active;
//     this.setState({ active: !currentState });
// };

  componentDidMount() {
    this.populateInitialData();
  }

  populateInitialData() {
    let collectionView = document.querySelector('#collections-view');
    console.log(collectionView);
  }

  handleColClick(e) {
    let collectionName = e.target.innerText;
    let collectionEls = document.querySelectorAll('.collection');
    for (let i = 0; i < collectionEls.length; i++){
      collectionEls[i].classList.remove('selected-collection');
    }
    e.target.classList.add('selected-collection');
    fetch(`/app/db/${collectionName}`)
      .then(res => res.json())
      .then(docs => {
        let something = docs.map((el)=>{el.name})
        this.setState({ currCol: collectionName, data: docs });
        // this.visualizeHandle(docs)
      })
      .catch(err => console.log(err));
  }

  // handleDocIdClick(e) {
  //   console.log(e.target);
  // }

  // visualizeHandle(thing) {
  //   console.log('hello', thing)
  //         // .then( docs => {
  //     //   // for(let i = 0; i < docs.length; i++) {
  //     //   //   console.log('doc', docs);
  //     //   // }
  //     // })
  //           // const childName = {};
  

  //     // const visObj = {
  //     //   name : collectionName,
  //     //   children : [
  
  //     //   ]
  //     // }
  // }

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
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        authoPort: this.state.authoPort,
        address: this.state.address,
        dbName: this.state.dbName
      })
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
            handleDocIdClick={this.handleDocIdClick}
            currCol={this.state.currentCollection}
            collections={this.state.collections}
            handleColClick={this.handleColClick}
            handleNests={this.handleNests}
            docData={this.state.data}
            logout={this.logout}
          />
        ) : (
          <Entry
            connectHandler={this.connectHandler}
            handleChange={this.handleChange}
            dataToPass={this.state}
          />
        )}
      </div>
    );
  }
}

export default App;
