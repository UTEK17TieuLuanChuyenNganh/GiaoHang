import {ADDORDER, CLEARORDER} from './actionTypes';
import {ADDUSER, CLEARUSER} from './actionTypes';
export const login = (order) => ({
  type: ADDORDER,
  payload: order
});
export const logout = () => ({
  type: CLEARORDER,
});
export const login = (user) => ({
  type: ADDUSER,
  payload: user
});
export const logout = () => ({
  type: CLEARUSER,
});