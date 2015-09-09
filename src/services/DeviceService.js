import request from 'reqwest';
import when from 'when';
import {DEVICE_TREE_URL} from '../constants/DeviceConstants.js';
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
        })
        .then(function(response) {
            DeviceActions.gotDeviceTree(response);
        });
    }
}

export default new DeviceService()
