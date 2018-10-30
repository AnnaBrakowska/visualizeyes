import React, { Component } from "react";
import { Checkbox } from 'antd';

class CollectionsView extends Component {
  constructor(props) {
    super(props);
  }

  // this.onChange = this.onChange.bind(this);onChange={this.onChange}

  onChange(e) {
    console.log(`checked ${e.target} ${e.target.checked}`);
  }


  render() {
    var dummyData = ['collection 1', 'collection 2', 'collection 3'];

    return (
      <div id="collections-view">
        <header className="collections-header">Collections</header>
        <ul className="collections">
          {dummyData.map(function (datum, idx) {
            return <li className="collections">
              <Checkbox className="collection" key={idx} >{datum}</Checkbox>
            </li>;
          })}
        </ul>
      </div>
    );
  }
}

export default CollectionsView;
