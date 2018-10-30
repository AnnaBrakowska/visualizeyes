import React, { Component } from 'react';
import CollectionsView from './CollectionsView.jsx';
import DocumentsView from './DocumentsView.jsx';

const DbWindow = (props) => {
  return(
    <div id="db-window">
      <CollectionsView />
      <DocumentsView />
    </div>
  );
}

export default DbWindow;
