import React, { Component } from 'react';
import DbWindow from './components/DbWindow.jsx';
import LandingPage from './components/LandingPage.jsx';



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
  }

  getDocumentsHandler() {
    fetch('/app/db')
    .then(res => res.json())
    .then ((res) => {
       console.log('Res >>>>>>', res);
       let keys = Object.keys(res);
       let vals = Object.values(res);
       console.log('keys', keys);
       console.log('vals', vals);
       this.setState({ 
         resKeys: keys,
         resVals : vals,
         connected: true, });
    })
    .catch(err => console.log(err));
  }

  toggleConnected() {
    this.setState({ connected: !this.state.connected })
  }

  connectHandler() {
    fetch("/app/db", {
      method: "POST",
      body: JSON.stringify({
        'username': this.state.username,
        'password': this.state.password,
        'authoPort': this.state.authoPort,
        'address': this.state.address,
        'dbName': this.state.dbName
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
      })
    })
    .catch(error => {console.log(error)})
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div>
        {this.state.connected ? (
          <DbWindow />
        ) : (
          <LandingPage
            handleChange={this.handleChange}
            connectHandler={this.connectHandler}
            dataToPass={this.state}
          />
        )}
      </div>
    );

    // for(let i = 0; i < this.state.resVals.length; i++) {
    //   let curKey = this.state.resKeys[i];
    //   let curVal = this.state.resVals[i];

    //   objectConstruct[curKey] = curVal;
      
    //   for (let itm in objectConstruct) {
    //     let cur = objectConstruct[itm];
    //     console.log('itm', itm);
    //     let cleanItm = JSON.parse(JSON.stringify(itm).replace('.', '-').toLowerCase());
    //     for (let z = 0; z < cur.length; z++) {
    //       count +=1;
    //       let document = JSON.stringify(cur[z]);
    //       documents.push(<span className={cleanItm} key={count}><span className="inner">{beautinator(JSON.parse(document))}</span></span>);
    //     }
    //   }
    // }

 
      // <div>
      //   { this.state.connected ? 
      //     <MainContainer /> : 
      //     <LandingPage handleChange={ this.handleChange } fetchOnClick={ this.fetchOnClick } url={ this.state.url }/> } 
      //     <div className="wrap">{documents}</div>
      // </div>

 
  }
}

export default App;