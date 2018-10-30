import React, { Component } from "react";

const Document = (props) => {

    let keys = Object.keys(props.data);
    let values = Object.values(props.data);

    // const lis = [];

    // keys.forEach((key, idx) => {
    //     return lis.push(<li key={idx}>{key}: {values[idx]}</li>);
    // })

    // <ul class="submenu">
    // {lis}
    // </ul>
    // 

    return (
        <li
        className="collection"
        name={props.data._id}
        key={props.data._id}
        onClick={props.handleDocIdClick}>
            {props.data._id}
        </li>
    );
  }

  export default Document;


