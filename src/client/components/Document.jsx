import React, { Component } from "react";
import SubMenu from "antd/lib/menu/SubMenu";

const Document = (props) => {

    let keys = Object.keys(props.data);
    let values = Object.values(props.data);

    const lis = keys.map((key, i) => {
        if (typeof(values[i]) === 'object') {
            return <li className="collection menu" key={i}>{key}: <Document key={i} data={values[i]} /></li>
        } else {
            return <li className="collection menu" key={i}>{key}: {values[i]}</li>
        }
    })

    return (
        <ul className="submenu" >{lis}</ul>
    )
  }

  export default Document;

