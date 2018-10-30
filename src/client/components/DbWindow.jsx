import React, { Component } from 'react';
import CollectionsView from './CollectionsView.jsx';
import DocumentsView from './DocumentsView.jsx';

const DbWindow = (props) => {
  return(
    <div>
    <CollectionsView />
    <DocumentsView />
    </div>
  );
}

export default DbWindow;
