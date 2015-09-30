import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {DEVICE_GET_TREE, DEVICE_GET_INFO} from '../constants/DeviceConstants.js';

export default {
  gotDeviceTree: (deviceTree) => {
    AppDispatcher.dispatch({
      actionType: DEVICE_GET_TREE,
      deviceTree: deviceTree
    });
  },

  gotDeviceInfo: (deviceInfo) => {
    AppDispatcher.dispatch({
      actionType: DEVICE_GET_INFO,
      deviceInfo: deviceInfo
    });
  }
};
