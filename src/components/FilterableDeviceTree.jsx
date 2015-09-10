'use strict'

import React from 'react';
import TreeView from './TreeView';
import AuthenticatedComponent from './AuthenticatedComponent';
import DeviceStore from '../stores/DeviceStore.js';
import DeviceService from '../services/DeviceService.js';
import {Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(this.refs.filterInput.getDOMNode().value);
    },
    render: function() {
        return (
                <input type="text"
                       ref="filterInput"
		               onChange={this.handleChange}
                       className='form-control'
                       style={{width:165, float: 'right'}}
                       value={this.props.filterText}
                       placeholder="Search..." />
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
            <div className="form-inline" style={{marginBottom: 3}} >
                <Dropdown id="add">
                    <Dropdown.Toggle bsStyle="success">
                        <Glyphicon glyph='plus' />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <MenuItem eventKey="child">Add Child</MenuItem>
                        <MenuItem eventKey="sibling">Add Sibling</MenuItem>
                    </Dropdown.Menu>
                </Dropdown>

                <Button bsStyle='danger'><Glyphicon glyph='trash' /></Button>
                <SearchBar
					filterText={this.state.filterText}
					onUserInput={this._handleUserInput}
                />
            </div>
			<TreeView
				data={this.state.deviceTree}
				filterText={this.state.filterText}
				nodeOnClick={this._treeNodeOnClick}
			/>
		</div>

        );
    }
};
