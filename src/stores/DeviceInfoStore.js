import { DEVICE_GET_INFO} from '../constants/DeviceConstants.js';
import {LOGOUT_USER} from '../constants/LoginConstants.js';
import BaseStore from './BaseStore';

class DeviceInfoStore extends BaseStore {
  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._deviceInfo = null;
  }

  _registerToActions(action) {
    switch(action.actionType) {
    case DEVICE_GET_INFO:
      this._deviceInfo = action.deviceInfo;
      this.emitChange();
      break;
    case LOGOUT_USER:
      this._deviceInfo = null;
      this.emitChange();
      break;
    default:
      break;
    };
  }
  
  get deviceInfo() {
    return this._deviceInfo;
  }
}

export default new DeviceInfoStore();
