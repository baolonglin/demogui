
import React from 'react'
import { Button, Tabs, Tab } from 'react-bootstrap'

export default class DeviceInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTabKey: this.props.groups ? this.props.groups[0].name : ''
        };

        this.handleTabChange = this.handleTabChange.bind(this);
    }

    handleTabChange(key) {
        //TODO validate data changes
        this.setState({activeTabKey: key});
    }

    render() {
        var tabs = [];
        if(this.props.groups) {
            this.props.groups.forEach(function(group) {
                tabs.push(<Tab eventKey={group.name} title={group.name}>Tab: {group.data}
                </Tab>);
            });
        }
        return (
            <Tabs activeKey={this.state.activeTabKey} onSelect={this.handleTabChange}>
                {tabs}
            </Tabs>);
    }
};
