'use strict'

import React from 'react';
import TreeView from './TreeView';
import AuthenticatedComponent from './AuthenticatedComponent';
import DeviceStore from '../stores/DeviceStore.js';
import DeviceService from '../services/DeviceService.js';

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
            filterText: '',
            deviceTree: DeviceStore.deviceTree
        };

        this._handleUserInput = this._handleUserInput.bind(this);
        this._treeNodeOnClick = this._treeNodeOnClick.bind(this);
        this._onDeviceTreeChange = this._onDeviceTreeChange.bind(this);
    }

    componentDidMount() {
        if(!this.state.deviceTree) {
            this.requestDeviceTree();
        }

        DeviceStore.addChangeListener(this._onDeviceTreeChange);
    }

    componentWillUnmount() {
        DeviceStore.removeChangeListener(this._onDeviceTreeChange);
    }

    _onDeviceTreeChange() {
        this.setState(this.getDeviceTreeState());
    }

    requestDeviceTree() {
        DeviceService.tree();
    }

    getDeviceTreeState() {
        return {
            deviceTree: DeviceStore.deviceTree
        };
    }

    _handleUserInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    _treeNodeOnClick(id) {
        console.log("Click id: ", id)
    }

    render() {
        return (
            <div>
                <SearchBar
                     filterText={this.state.filterText}
                     onUserInput={this._handleUserInput}
                />
                <TreeView
                     data={this.state.deviceTree}
                     filterText={this.state.filterText}
                     nodeOnClick={this._treeNodeOnClick}
                />
            </div>

        );
    }
};
