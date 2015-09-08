import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import FilterableDeviceTree from './FilterableDeviceTree'
import DeviceInformation from './DeviceInformation'

import MyContainer from './Test'

export default AuthenticatedComponent(class Home extends React.Component {

  render() {
      var groups = [
          {name: "Basic", data: "Basic data"},
          {name: "Advanced", data: "Advanced data"},
          {name: "Monitor & Operator", data: "Monitor & Operator"}
      ];
    return (
        <div className="row">
            <div className="col-md-3">
                <FilterableDeviceTree />
            </div>
            <div className="col-md-9">
                <DeviceInformation
                      deviceId="3"
                      groups={groups}
                />
            </div>
        </div>
    );
  }
});

