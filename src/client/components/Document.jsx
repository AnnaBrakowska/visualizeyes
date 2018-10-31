import React, { Component } from "react";
import SubMenu from "antd/lib/menu/SubMenu";

class Document extends Component {
  constructor(props) {
    super(props);
  }

  createList(item) {
    console.log("Hello");
    let values = Array.isArray(item) ? item : Object.values(item);
    console.log(values);
    return values.map((el, i) => {
      console.log(el);
      return (
        <li key={i}>
          {typeof el === "object" ? <ul>{this.createList(el)}</ul> : el}
        </li>
      );
    });
  }

  render() {
    return <div>{this.createList(this.props.data)}</div>;
  }
}

export default Document;
