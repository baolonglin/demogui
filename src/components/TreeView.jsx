'use strict'

import React from 'react'
import TreeNode from './TreeNode'

export default class TreeView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedId: 0
        }

        this.nodeOnClick = this.nodeOnClick.bind(this);
    }

    nodeOnClick(id) {
        this.setState({selectedId: id});

        this.props.nodeOnClick(id);
    }

    render() {

        var children = [];
        if (this.props.data) {
            var _this = this;
            this.props.data.forEach(function (node) {
                children.push(<TreeNode node={node}
                                        key={node.id}
                                        level={1}
                                        selectedId={_this.state.selectedId}
                                        onClick={_this.nodeOnClick}
                                        visible={true}
                                        options={_this.props}
                              />);
            });
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

    filterText: React.PropTypes.string,

    data: React.PropTypes.arrayOf(React.PropTypes.object)
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

    filterText: '',

    data: []
};

