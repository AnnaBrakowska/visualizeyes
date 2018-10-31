import React, { Component } from "react";
import Document from "./Document.jsx";

class DocumentsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: []
    };
  }

  toggle(event) {
    console.log("hello from toggle");
    console.log("this is key ", event.target.id);
    event.preventDefault();

    let falsies = this.props.currDocs.map(el => false);
    this.setState({ toggled: falsies });

    let tog = falsies;
    tog[event.target.id] = true;
    this.setState({ toggled: tog });
  }

  render() {
    let list = this.props.currDocs.map((datum, idx) => {
      return (
        <ul
          key={idx}
          onClick={event => this.toggle(event)}
          id={idx}
          className="collection"
        >
          {datum._id}
          {this.state.toggled[idx] ? <Document data={datum} /> : null}
        </ul>
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
