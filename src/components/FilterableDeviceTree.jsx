'use strict'

import React from 'react'
import TreeView from './TreeView'

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.filterInput.getDOMNode().value);
    },
    render: function() {
        return (
            <form>
                <input type="text"
                       ref="filterInput"
                       onChange={this.handleChange}
                       value={this.props.filterText}
                       placeholder="Search..." />
            </form>
        );
    }
});


export default class FilterableDeviceTree extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: ''
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.treeNodeOnClick = this.treeNodeOnClick.bind(this);
    }

    handleUserInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    treeNodeOnClick(id) {
        console.log("Click id: ", id)
    }

    render() {
        var data = [
              {
                  id: 1,
                  text: "Parent 1",
                  nodes: [
                      {
                          id: 2,
                          text: "Child 1",
                          nodes: [
                              {
                                  id: 3,
                                  text: "Grandchild 1"
                              },
                              {
                                  id: 4,
                                  text: "Grandchild 2"
                              }
                          ]
                      },
                      {
                          id: 5,
                          text: "Child 2"
                      }
                  ]
              },
              {
                  id: 6,
                  text: "Parent 2"
              },
              {
                  id: 7,
                  text: "Parent 3"
              },
              {
                  id: 8,
                  text: "Parent 4"
              },
              {
                  id: 9,
                  text: "Parent 5"
              }
          ];
        return (
            <div>
                <SearchBar
                     filterText={this.state.filterText}
                     onUserInput={this.handleUserInput}
                />
                <TreeView
                     data={data}
                     filterText={this.state.filterText}
                     nodeOnClick={this.treeNodeOnClick}
                />
            </div>

        );
    }
}
