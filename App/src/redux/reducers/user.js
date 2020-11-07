import {LOGIN, LOGOUT} from '../actionTypes';

const initialState = {
  user: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        user: []
      };
    }
    default:
      return state;
  }
}