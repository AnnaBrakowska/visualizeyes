import React, { Component } from "react";
import CollectionsView from "./CollectionsView.jsx";
import DocumentsView from "./DocumentsView.jsx";
import Header from "./Header.jsx";

const DbWindow = props => {
  return (
    <div>
      <Header logout={props.logout} />
      <div id="db-window">
        <CollectionsView
          currCol={props.currCol}
          collections={props.collections}
          handleColClick={props.handleColClick}
        />

        <DocumentsView 
          handleNests={props.handleNests}
          currDocs={props.docData} 
          documents={props.collections}
          handleDocIdClick={props.handleDocIdClick} 
        />
        </div>
    </div>
  );
};

export default DbWindow;


