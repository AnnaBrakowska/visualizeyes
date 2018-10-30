import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import LandingPage from './containers/LandingPage.jsx';
import FileContainer from './containers/FileContainer.jsx';
const beautinator = require("beautinator");

require("./css/style.css");


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url : '',
      collections : [],
      data : [],
      resKeys : [],
      resVals : [],
      connected : false
    }
    this.fetchOnClick = this.fetchOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchOnClick() {
    fetch('/app/db')
    .then(res => res.json())
    .then ((res) => {
       console.log('---------Response to client---------', res);
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

  handleChange(event) {
    this.setState({ url: event.target.value});
  }

  render() {

    let documents = [];
    let objectConstruct = {};
    let count = 0;

    for(let i = 0; i < this.state.resKeys.length; i++) {
      let curKey = this.state.resKeys[i];
      let curVal = this.state.resVals[i];

      objectConstruct[curKey] = curVal;
      
      for (let itm in objectConstruct) {
        let cur = objectConstruct[itm];
        console.log('itm', itm);
        let cleanItm = JSON.parse(JSON.stringify(itm).replace('.', '-').toLowerCase());
        for (let z = 0; z < cur.length; z++) {
          count +=1;
          let document = JSON.stringify(cur[z]);
          documents.push(<span className={cleanItm} key={count}><span className="inner">{beautinator(JSON.parse(document))}</span></span>);
        }
      }
    }

    return (
      <div>
        { this.state.connected ? 
          <MainContainer /> : 
          <LandingPage handleChange={ this.handleChange } fetchOnClick={ this.fetchOnClick } url={ this.state.url }/> } 
          <div className="wrap">{documents}</div>
      </div>
    );
 
  }
}

export default App;