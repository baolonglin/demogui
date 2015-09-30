import request from 'reqwest';
import when from 'when';
import {DEVICE_TREE_URL, DEVICE_INFO_URL} from '../constants/DeviceConstants.js';
import DeviceActions from '../actions/DeviceAction.js';
import LoginStore from '../stores/LoginStore.js';

class DeviceService {
  tree() {
    request({
      url: DEVICE_TREE_URL,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    }).then(function(response) {
      DeviceActions.gotDeviceTree(response);
    });
  }
  info(id) {
    request({
      url: `${DEVICE_INFO_URL}${id}`,
      method: 'GET',
      crossOrigin: true,
      headers: {
        'Authorization': 'Bearer ' + LoginStore.jwt
      }
    }).then(function(response) {
      DeviceActions.gotDeviceInfo(response);
    });
  }
}

export default new DeviceService();
