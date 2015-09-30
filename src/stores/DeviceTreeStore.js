import {DEVICE_GET_TREE, DEVICE_GET_INFO} from '../constants/DeviceConstants.js';
import {LOGOUT_USER} from '../constants/LoginConstants.js';
import BaseStore from './BaseStore';

class DeviceTreeStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._deviceTree = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
    case DEVICE_GET_TREE:
      this._deviceTree = action.deviceTree;
      this.emitChange();
      break;
    case LOGOUT_USER:
      this._deviceTree = null;
      this.emitChange();
      break;
    default:
      break;
    };
  }
  
  get deviceTree() {
    return this._deviceTree;
  }

}

export default new DeviceTreeStore();
