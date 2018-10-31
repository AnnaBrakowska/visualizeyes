import React, { Component } from "react";
import D3Graph from "./D3Graph.jsx";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class VisualizeModal extends Component {
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
          className="ui secondary inverted basic button">
          Visualize
        </Button>

        <Modal id="modal" dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Vizualize</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
             <div>
                <D3Graph />
             </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
           
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default VisualizeModal;
