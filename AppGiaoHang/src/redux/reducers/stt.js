import {ADDSTT, CLEARSTT} from '../actionTypes';

const initialState = {
  stt: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDSTT: {
      return {
        ...state,
        stt: action.payload,
      };
    }
    case CLEARSTT: {
      return {
        ...state,
        stt: 0
      };
    }
    default:
      return state;
  }
}