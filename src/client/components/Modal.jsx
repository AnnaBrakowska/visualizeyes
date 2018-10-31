import React, { Component } from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class ModalExampleDimmer extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  show = dimmer => () => this.setState({ dimmer, open: true });
  close = () => this.setState({ open: false });

  render() {
    const { open, dimmer } = this.state;

    return (
      <div>
        <Button
          onClick={this.show("inverted")}
          id="button"
          className="ui secondary basic button"
        >
          <i className="power off icon" />
          Connect
        </Button>

        <Modal id="modal" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>CONNECT TO HOST</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
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
              </form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <div
              onClick={this.props.connectHandler}
              className="ui bottom teal attached button"
            >
              <i className="add icon" />
              Connect
            </div>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default ModalExampleDimmer;
