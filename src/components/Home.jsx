import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import FilterableDeviceTree from './FilterableDeviceTree'
import DeviceInformation from './DeviceInformation'
import DeviceService from '../services/DeviceService'

export default AuthenticatedComponent(class Home extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      selectedDeviceId: 0,
    };

    this._onSelectedDeviceIdChange = this._onSelectedDeviceIdChange.bind(this);
  }

  componentDidMount() {
  }
  
  componentWillUnmount() {
  }

  _onSelectedDeviceIdChange(id) {
    DeviceService.info(id);
    this.setState({selectedDeviceId: id});
  }
  
  render() {
      var groups = [
          {name: "Basic", data: "Basic data"},
          {name: "Advanced", data: "Advanced data"},
          {name: "Monitor & Operator", data: "Monitor & Operator"}
      ];
    return (
        <div className="row">
            <div className="col-md-3">
                <FilterableDeviceTree nodeOnClick={this._onSelectedDeviceIdChange} selectedDeviceId={this.state.selectedDeviceId} />
            </div>
            <div className="col-md-9">
                <DeviceInformation deviceId={this.state.selectedDeviceId} />
            </div>
        </div>
    );
  }
});

