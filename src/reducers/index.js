import { FETCH_FUNDS } from '../actions/types';
import { FETCH_USER } from '../actions/types';

const initialState = {
  funds: [],
  user: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FUNDS:
      return {...state, funds: action.payload }
    case FETCH_USER:
      return {...state, user: action.payload }
    default:
      return state;
  }
};
