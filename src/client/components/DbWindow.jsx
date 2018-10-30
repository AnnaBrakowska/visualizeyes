import React, { Component } from "react";
import CollectionsView from "./CollectionsView.jsx";
import DocumentsView from "./DocumentsView.jsx";
import Header from "./Header.jsx";

const DbWindow = (props) => {
  return(
    <div id="db-window">
      <Header toggleConnected={props.toggleConnected} />
      <CollectionsView currCol={props.currCol} collections={props.collections} handleColClick={props.handleColClick}/>
      <DocumentsView />
    </div>
  );
};

export default DbWindow;
