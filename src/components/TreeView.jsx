'use strict'

import React from 'react'
import TreeNode from './TreeNode'

export default class TreeView extends React.Component {
    constructor(props) {
        super(props);
        this.setNodeId = this.setNodeId.bind(this);
    }

    setNodeId(node) {
        if (!node.nodes) return;
        var _this = this;
        node.nodes.forEach(function checkStates(node) {
            node.nodeId = _this.props.nodes.length;
            _this.props.nodes.push(node);
            _this.setNodeId(node);
        });
    }

    render() {
        this.setNodeId({ nodes: this.props.data });

        var children = [];
        if (this.props.data && !this.props.filterText) {
            var _this = this;
            this.props.data.forEach(function (node) {
                children.push(<TreeNode node={node}
                                        level={1}
                                        visible={true}
                                        options={_this.props} />);
            });
        } else {

        }

        return (
            <div id='treeview' className='treeview'>
                <ul className='list-group'>
                    {children}
                </ul>
            </div>
        );
    }
};


TreeView.propTypes = {
    levels: React.PropTypes.number,

    expandIcon: React.PropTypes.string,
    collapseIcon: React.PropTypes.string,
    emptyIcon: React.PropTypes.string,
    nodeIcon: React.PropTypes.string,

    color: React.PropTypes.string,
    backColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,
    onhoverColor: React.PropTypes.string,
    selectedColor: React.PropTypes.string,
    selectedBackColor: React.PropTypes.string,

    enableLinks: React.PropTypes.bool,
    highlightSelected: React.PropTypes.bool,
    showBorder: React.PropTypes.bool,
    showTags: React.PropTypes.bool,

    nodes: React.PropTypes.arrayOf(React.PropTypes.number)
};

TreeView.defaultProps = {
    levels: 2,

    expandIcon: 'glyphicon glyphicon-plus',
    collapseIcon: 'glyphicon glyphicon-minus',
    emptyIcon: 'glyphicon',
    nodeIcon: 'glyphicon glyphicon-stop',

    color: undefined,
    backColor: undefined,
    borderColor: undefined,
    onhoverColor: '#F5F5F5', // TODO Not implemented yet, investigate radium.js 'A toolchain for React component styling'
    selectedColor: '#FFFFFF',
    selectedBackColor: '#428bca',

    enableLinks: false,
    highlightSelected: true,
    showBorder: true,
    showTags: false,

    nodes: []
};

