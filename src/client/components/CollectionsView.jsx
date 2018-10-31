import React, { Component } from "react";
import { Checkbox } from "antd";

const CollectionsView = props => {
  return (
    <div id="collections-view">
      <div className="collections-header">Collections</div>
      <ul className="collections">
        {props.collections.map(function(datum, idx) {
          return (
            <li
              className="collection"
              name={datum.name}
              key={idx}
              onClick={props.handleColClick}
            >
              {datum.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CollectionsView;
