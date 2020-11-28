import {ADDUSER, CLEARUSER} from '../actionTypes';

const initialState = {
  user: 0,
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
    default:
      return state;
  }
}