import React, { Component } from "react";
import Document from "./Document.jsx";

const DocumentsView = (props) => {

    return (
      <div id="documents-view">
        <div className="grid-item">
          <ul className="collections">
            {props.currDocs.map( (datum, idx) => {
              return ( <Document data={datum}/> )
            })}
          </ul>
        </div>
      </div> 
    )
  }

  export default DocumentsView;
