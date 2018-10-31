import React, { Component } from "react";
import CollectionsView from "./CollectionsView.jsx";
import Header from "./Header.jsx";

import ReactJson from 'react-json-view';

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
        <ReactJson className='react-json' onEdit={props.updateDb} src={props.docData} name={null} collapsed={2} displayDataTypes={false}/>
      </div>
    </div>
  );
};

export default DbWindow;



