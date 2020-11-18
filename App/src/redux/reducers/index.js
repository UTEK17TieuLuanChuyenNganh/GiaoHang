import { combineReducers } from 'redux';
import user from './user';
import address from './address';
import notice from './notification'
export default combineReducers({ user, address, notice });