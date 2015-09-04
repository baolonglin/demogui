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

        this.state = {filterText: ''};

        this.handleUserInput = this.handleUserInput.bind(this);
    }

    handleUserInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        var data = [
              {
                  text: "Parent 1",
                  nodes: [
                      {
                          text: "Child 1",
                          nodes: [
                              {
                                  text: "Grandchild 1"
                              },
                              {
                                  text: "Grandchild 2"
                              }
                          ]
                      },
                      {
                          text: "Child 2"
                      }
                  ]
              },
              {
                  text: "Parent 2"
              },
              {
                  text: "Parent 3"
              },
              {
                  text: "Parent 4"
              },
              {
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
                />
            </div>
        );
    }
}
