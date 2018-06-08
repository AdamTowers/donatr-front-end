import { FETCH_DONATIONS, NEW_DONATION } from '../actions/types';

const initialState = {
  donations: [],
  donation: {}
}

export default function manageDonations(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
};
