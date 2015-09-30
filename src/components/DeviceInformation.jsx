
import React from 'react'
import { Button, Tabs, Tab } from 'react-bootstrap'
import DeviceStore from '../stores/DeviceInfoStore'

export default class DeviceInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: '',
      info: DeviceStore.deviceInfo
    };

    this._handleTabChange = this._handleTabChange.bind(this);
    this._onDeviceInfoChange = this._onDeviceInfoChange.bind(this);
  }

  componentDidMount() {
    DeviceStore.addChangeListener(this._onDeviceInfoChange);
  }

  componentWillUnmount() {
    DeviceStore.removeChangeListener(this._onDeviceInfoChange);
  }

  _onDeviceInfoChange() {
    var activeTab = '';
    const deviceInfo = DeviceStore.deviceInfo;
    if(deviceInfo && deviceInfo.length > 0) {
      if(! this.state.activeTabKey) {
        activeTab = deviceInfo[0].name
      } else {
        var i = 0;
        for(; i < deviceInfo.length; ++i) {
          if(deviceInfo[i].name === this.state.activeTabKey) {
            activeTab = deviceInfo[i].name;
          }
        }
        if(!activeTab) {
          activeTab = deviceInfo[0].name;
        }
      }
    }
    this.setState({
      info: deviceInfo,
      activeTabKey: activeTab
    });
  }

  _handleTabChange(key) {
    //TODO validate data changes
    this.setState({activeTabKey: key});
  }

  render() {
    const deviceInfo = this.state.info;
    var tabs = [];
    if(deviceInfo) {
      deviceInfo.forEach(function(group) {
        tabs.push(<Tab key={group.name} eventKey={group.name} title={group.name}>Tab: {group.data}
        </Tab>);
      });
    }

    return (
      <Tabs activeKey={this.state.activeTabKey} onSelect={this._handleTabChange}>
        {tabs}
      </Tabs>);
  }
};
