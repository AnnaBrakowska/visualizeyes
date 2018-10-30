import React, { Component } from "react";

class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20vh"
        }}
      >
        <div
          className="ui segment"
          style={{ width: "50%", boxShadow: "2px 3px 1px 1px lightgray" }}
        >
          <h2 className="ui center floated header">CONNECT TO HOST</h2>
          <div className="ui clearing divider" />
          <form className="ui form">
            <div className="field">
              <label>User Name</label>
              <input
                type="text"
                name="username"
                placeholder="User Name..."
                value={this.props.dataToPass.username}
                onChange={this.props.handleChange}
              />
            </div>
            <div className="field">
              <label>Password</label>
              <input
                type="text"
                name="password"
                placeholder="Password..."
                value={this.props.dataToPass.password}
                onChange={this.props.handleChange}
              />
            </div>
            <div className="field">
              <label>Authenticated Port</label>
              <input
                type="text"
                name="authoPort"
                placeholder="Authenticated Port..."
                value={this.props.dataToPass.authoPort}
                onChange={this.props.handleChange}
              />
            </div>
            <div className="field">
              <label>Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address..."
                value={this.props.dataToPass.address}
                onChange={this.props.handleChange}
              />
            </div>
            <div className="field">
              <label>Database Name</label>
              <input
                type="text"
                name="dbName"
                placeholder="Database Name..."
                value={this.props.dataToPass.dbName}
                onChange={this.props.handleChange}
              />
            </div>

            <div
              onClick={this.props.connectHandler}
              className="ui bottom teal attached button"
            >
              <i className="add icon" />
              Connect
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LandingPage;
