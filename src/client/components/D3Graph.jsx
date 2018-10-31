import React, { Component } from "react";
import Tree from 'react-d3-tree';

const myTreeData = [
    {
        name: "Services",
        children: [
            {name:"Whole Foods Market"},
            {name:"CVS"},
            {name:"Sew Good Cleaners"},
            {name:"St Marks Market"}
        ]
    }
  ];

export default class D3Graph extends Component  {
  render() {
    return (
      <div id="treeWrapper" style={{width: '100%', height: '50vh'}}>
        <Tree 
        data={myTreeData}
        initialDepth={10}
        collapsible={true}
        orientation={"vertical"}
        translate={{x:390, y:50}}
        />
      </div>
    );
  }
}