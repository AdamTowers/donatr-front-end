import { FETCH_FUNDS } from '../actions/types';

const initialState = {
  funds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FUNDS:
      return {...state, funds: action.payload }
    default:
      return state;
  }
};
