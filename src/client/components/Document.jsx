import React, { Component } from "react";
import SubMenu from "antd/lib/menu/SubMenu";

class Document extends Component {
  constructor(props) {
    super(props);
  }

  createList(item) {
    let keys = Object.keys(item);
    let values = Array.isArray(item) ? item : Object.values(item);
    console.log(values);
    return values.map((el, i) => {
      console.log(el);
      return (
        <ul key={keys[i]}>
          {Array.isArray(el) ? <ul>{this.createList(el)}</ul> : el}
        </ul>
      );
    });
  }

  render() {
    return <div>{this.createList(this.props.data)}</div>;
  }
}

export default Document;
