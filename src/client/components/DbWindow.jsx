import React, { Component } from 'react';
import CollectionsView from './CollectionsView.jsx';
import DocumentsView from './DocumentsView.jsx';

const DbWindow = (props) => {
  return(
    <div id="db-window">
      <CollectionsView currCol={props.currCol} collections={props.collections} handleColClick={props.handleColClick}/>
      <DocumentsView />
    </div>
  );
}

export default DbWindow;
