import {ADDCHUOI,CLEARCHUOI} from '../actionTypes';

const initialState = {
  chuoiid: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
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