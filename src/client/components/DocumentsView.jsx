import React, { Component } from "react";
import Document from "./Document.jsx";

class DocumentsView extends Component {
  render() {
    let list = this.props.currDocs.map((datum, idx) => {
      return (
        <li key={idx} index={idx} className="collection">
          {datum._id}
          <Document data={datum} />
        </li>
      );
    });

    return (
      <div id="documents-view">
        <div className="grid-item">
          <ul className="collections">{list}</ul>
        </div>
      </div>
    );
  }
}

export default DocumentsView;
