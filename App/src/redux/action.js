import {LOGIN, LOGOUT,CHOSEADDRESS,CLEARADDRESS,ADDNEWNOTICE,CLEARNOTICE} from './actionTypes';

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
export const addNewNotice = () => ({
  type: ADDNEWNOTICE,
});
export const clearNotice = () => ({
  type: CLEARNOTICE,
});