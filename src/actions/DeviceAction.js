import AppDispatcher from '../dispatchers/AppDispatcher.js';
import {DEVICE_GET_TREE} from '../constants/DeviceConstants.js';

export default {
    gotDeviceTree: (deviceTree) => {
        AppDispatcher.dispatch({
            actionType: DEVICE_GET_TREE,
            deviceTree: deviceTree
        })
    }
}
