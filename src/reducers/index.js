import { FETCH_USER } from '../actions/types';
import { FETCH_FUNDS } from '../actions/types';
import { SELECTED_FUND } from '../actions/types';

const initialState = {
  organizations: [],
  funds: [],
  user: {
    donations: []
  },
  selectedFund: {},
  selectedOrg: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FUNDS:
      return {...state, funds: action.payload }
    case FETCH_USER:
      return {...state, user: action.payload }
    case SELECTED_FUND:
      return {...state, selectedFund: action.payload }
    default:
      return state;
  }
};
