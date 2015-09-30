'use strict'

import React from 'react';
import TreeView from './TreeView';
import AuthenticatedComponent from './AuthenticatedComponent';
import DeviceStore from '../stores/DeviceTreeStore.js';
import DeviceService from '../services/DeviceService.js';
import {Button, Glyphicon, Dropdown, MenuItem} from 'react-bootstrap';
import { FormattedMessage } from 'react-intl-es6';

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
    this._onDeviceTreeChange = this._onDeviceTreeChange.bind(this);
  }

  static contextTypes = {
    intl: React.PropTypes.object
  };


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
    this.setState({deviceTree: DeviceStore.deviceTree});
  }
  
  requestDeviceTree() {
    DeviceService.tree();
  }

  _handleUserInput(filterText) {
    this.setState({
      filterText: filterText
    });
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
              <MenuItem eventKey="child">
                <FormattedMessage message={this.context.intl.getMessage('home.tree.add_child')} />
              </MenuItem>
              <MenuItem eventKey="sibling">
                <FormattedMessage message={this.context.intl.getMessage('home.tree.add_sibling')} />
              </MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          
          <Button bsStyle='danger'><Glyphicon glyph='trash' /></Button>
          <SearchBar filterText={this.state.filterText} onUserInput={this._handleUserInput}
          />
        </div>
	<TreeView data={this.state.deviceTree} filterText={this.state.filterText} nodeOnClick={this.props.nodeOnClick} selectedId={this.props.selectedDeviceId} />
      </div>
      
    );
  }
};
