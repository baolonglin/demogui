import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {
  DEVICE_GET_TREE,
  DEVICE_GET_INFO,
  DEVICE_ADD_UNDER,
  DEVICE_CHANGE_NAME
} from '../constants/DeviceConstants.js';

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
  },

  addDeviceUnder: (deviceId) => {
    AppDispatcher.dispatch({
      actionType: DEVICE_ADD_UNDER,
      parentId: deviceId
    });
  },

  changeDeviceName: (deviceId, newName) => {
    AppDispatcher.dispatch({
      actionType: DEVICE_CHANGE_NAME,
      id: deviceId,
      text: newName
    });
  }
};
