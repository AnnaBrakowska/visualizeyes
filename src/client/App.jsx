import React, { Component } from 'react';
import MainContainer from './containers/MainContainer.jsx';
import LandingPage from './containers/LandingPage.jsx';
import FileContainer from './containers/FileContainer.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      collections: [],
      data: [],
      connected: false
    }
    this.fetchOnClick = this.fetchOnClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  fetchOnClick() {
    fetch('/app/db')
    .then(res => res.json())
    .then ((res) => {
       console.log('Res: ', res);
       this.setState({ connected: true });
    })
    .catch(err => console.log(err));
  }

  handleChange(event) {
    this.setState({ url: event.target.value});
  }

  render() {
    return (
      <div>
        { this.state.connected ? 
          <MainContainer /> : 
          <LandingPage handleChange={ this.handleChange } fetchOnClick={ this.fetchOnClick } url={ this.state.url }/> } 
      </div>

    );
  }
}

export default App;
