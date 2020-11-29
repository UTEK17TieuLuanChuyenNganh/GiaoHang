import {ADDUSER, CLEARUSER,ADDCHUOI,CLEARCHUOI} from '../actionTypes';

const initialState = {
  user: 0,
  chuoiid: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDUSER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case CLEARUSER: {
      return {
        ...state,
        user: 0
      };
    }
    case ADDCHUOI: {
      return {
        ...state,
        chuoiid: action.payload,
      };
    }
    case CLEARCHUOI: {
      return {
        ...state,
        chuoiid: 0
      };
    }
    default:
      return state;
  }
}