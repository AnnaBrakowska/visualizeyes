import React, { Component } from 'react';
import SearchBar from '../components/SearchBar.jsx';


// const mapDispatchToProps = dispatch => ({
//   setUrl: (url) => {
//     dispatch(actions.setUrl(url))
//   },
//   changeConnection: () => {
//     dispatch(actions.changeConnection())
//   }
// });

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h1> VisualEyes </h1>
        <h3> Database GUI </h3>
        <div>
          <input value={ this.props.url } onChange={ this.props.handleChange } />
          <button onClick={ this.props.fetchOnClick }> Connect </button>
    </div>
      </div>
    );
  }
}

export default LandingPage;
