import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import FilterableDeviceTree from './FilterableDeviceTree'

import MyContainer from './Test'

export default AuthenticatedComponent(class Home extends React.Component {

  render() {
    return (
        <div className="row">
            <div className="col-md-3">
                <FilterableDeviceTree />
            </div>
            <div className="col-md-9"></div>
        </div>
    );
  }
});

