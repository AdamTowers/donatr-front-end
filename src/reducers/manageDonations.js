import { FETCH_DONATIONS, NEW_DONATION } from '../actions/types';

const initialState = {
  donations: [],
  donation: {}
}

export default function manageDonations(state = initialState, action) {
  switch (action.type) {
    case FETCH_DONATIONS:
      return {
        ...state,
        donations: action.payload
      }
    default:
      return state;
  }
};
