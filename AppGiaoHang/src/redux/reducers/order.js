import {ADDORDER, CLEARORDER} from '../actionTypes';

const initialState = {
  order: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDORDER: {
      return {
        ...state,
        order: action.payload,
      };
    }
    case CLEARORDER: {
      return {
        ...state,
        order: []
      };
    }
    default:
      return state;
  }
}