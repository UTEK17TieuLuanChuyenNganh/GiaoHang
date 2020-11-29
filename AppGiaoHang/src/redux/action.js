import {ADDORDER, CLEARORDER} from './actionTypes';
import {ADDUSER, CLEARUSER} from './actionTypes';
import {ADDCHUOI, CLEARCHUOI} from './actionTypes';
import {ADDSTT, CLEARSTT} from './actionTypes';
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
export const login = (chuoi) => ({
  type: ADDCHUOI,
  payload: chuoi
});
export const logout = () => ({
  type: CLEARCHUOI,
});
export const login = (stt) => ({
  type: ADDSTT,
  payload: stt
});
export const logout = () => ({
  type: CLEARSTT,
});