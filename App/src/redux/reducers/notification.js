import {ADDNEWNOTICE, CLEARNOTICE} from '../actionTypes';

const initialState = {
  newNotice: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADDNEWNOTICE: {
      return {
        ...state,
        newNotice: action.payload,
      };
    }
    case CLEARNOTICE: {
      return {
        ...state,
        newNotice: []
      };
    }
    default:
      return state;
  }
}