import React, { Component } from "react";
import CollectionsView from "./CollectionsView.jsx";
import DocumentsView from "./DocumentsView.jsx";
import Header from "./Header.jsx";

const DbWindow = props => {
  return (
    <div>
      <Header toggleConnected={props.toggleConnected} />
      <CollectionsView />
      <DocumentsView />
    </div>
  );
};

export default DbWindow;
