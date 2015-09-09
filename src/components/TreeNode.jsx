'use strict'

import React from 'react'

export default class TreeNode extends React.Component {

    constructor(props) {
        super(props);
        var node = this.props.node;

        this.state = {
            expanded: (node.state && node.state.hasOwnProperty('expanded')) ? node.state.expanded :
            (this.props.level < this.props.options.levels) ? true : false
        };

        this.toggleExpanded = this.toggleExpanded.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    toggleExpanded(id, event) {
        this.setState({ expanded: !this.state.expanded });
        event.stopPropagation();
    }

    onClick(id, event) {
        this.props.onClick(id);
        event.stopPropagation();
    }

    componentWillReceiveProps(nextProps) {
        console.log("Receive props change: ", this.props.node.text);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("should component update: ", this.props.node.text);
        return true;
    }

    render() {

        var node = this.props.node;
        var options = this.props.options;
        var filterText = options.filterText;

        var style;
        if (!this.props.visible || filterText && node.text.toLowerCase().indexOf(filterText.toLowerCase()) == -1) {
            style = {
                display: 'none'
            };
        }
        else {
            if (options.highlightSelected && this.props.selectedId == node.id) {
                style = {
                    color: options.selectedColor,
                    backgroundColor: options.selectedBackColor
                };
            }
            else {
                style = {
                    color: node.color || options.color,
                    backgroundColor: node.backColor || options.backColor
                };
            }

            if (!options.showBorder) {
                style.border = 'none';
            }
            else if (options.borderColor) {
                style.border = '1px solid ' + options.borderColor;
            }
        }

        var indents = [];
        for (var i = 0; i < this.props.level - 1; i++) {
            indents.push(<span className='indent'></span>);
        }

        var expandCollapseIcon;
        if (node.nodes) {
            if (!this.state.expanded) {
                expandCollapseIcon = (
                    <span className={options.expandIcon}
                          onClick={this.toggleExpanded.bind(this, node.id)}>
                    </span>
                );
            }
            else {
                expandCollapseIcon = (
                    <span className={options.collapseIcon}
                          onClick={this.toggleExpanded.bind(this, node.id)}>
                    </span>
                );
            }
        }
        else {
            expandCollapseIcon = (
                <span className={options.emptyIcon}></span>
            );
        }

        var nodeIcon = (
            <span className='icon'>
                <i className={node.icon || options.nodeIcon}></i>
            </span>
        );

        var nodeText;
        if (options.enableLinks) {
            nodeText = (
                <a href={node.href} /*style="color:inherit;"*/>
                {node.text}
                </a>
            );
        }
        else {
            nodeText = (
                <span>{node.text}</span>
            );
        }

        var badges;
        if (options.showTags && node.tags) {
            badges = node.tags.map(function (tag) {
                return (
                    <span className='badge'>{tag}</span>
                );
            });
        }

        var children = [];
        if (node.nodes) {
            var _this = this;
            node.nodes.forEach(function (node) {
                var visible = _this.state.expanded && _this.props.visible;
                if(filterText) {
                    if(node.text.toLowerCase().indexOf(filterText.toLowerCase()) != -1) {
                        visible = true;
                    } else {
                        visible = false;
                    }
                }
                console.log("Node", node.text, visible);
                children.push(<TreeNode node={node}
                                        key={node.id}
                                        level={_this.props.level+1}
                                        visible={visible}
                                        selectedId={_this.props.selectedId}
                                        onClick={_this.props.onClick}
                                        options={options}
                              />);
            });
        }

        console.log(node.text, style);

        return (
            <span>
            <li className='list-group-item'
                style={style}
                onClick={this.onClick.bind(this, node.id)}
                >
                {indents}
                {expandCollapseIcon}
                {nodeIcon}
                {nodeText}
                {badges}
            </li>
            {children}
            </span>

        );
    }
};

TreeNode.propTypes = {
    node: React.PropTypes.object,
    options: React.PropTypes.object,
    level: React.PropTypes.number,
    visible: React.PropTypes.bool
};

TreeNode.defaultProps = {
};
