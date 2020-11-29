import { combineReducers } from 'redux';
import order from './order';
import user from './user';
import stt from './stt'
export default combineReducers({order,user,stt});