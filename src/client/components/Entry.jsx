import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import ModalExampleDimmer from "./Modal.jsx";

export default function Entry(props) {
  return (
    <div id="landing">
      <ModalExampleDimmer
        handleChange={props.handleChange}
        connectHandler={props.connectHandler}
        dataToPass={props.dataToPass}
      />

      <div id="landing-text">
        <div id="text1">VisualEyesDB</div>
        <div id="text2">MongoDB management tool</div>
      </div>
    </div>
  );
}
