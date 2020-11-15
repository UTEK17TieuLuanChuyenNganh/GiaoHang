import {LOGIN, LOGOUT,CHOSEADDRESS,CLEARADDRESS} from './actionTypes';

export const login = (user) => ({
  type: LOGIN,
  payload: user
});
export const logout = () => ({
  type: LOGOUT,
});
export const choseAddress = () => ({
  type: CHOSEADDRESS,
});
export const clearAddress = () => ({
  type: CLEARADDRESS,
});