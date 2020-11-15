import {CHOSEADDRESS, CLEARADDRESS} from '../actionTypes';

const initialState = {
  address: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHOSEADDRESS: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case CLEARADDRESS: {
      return {
        ...state,
        address: []
      };
    }
    default:
      return state;
  }
}