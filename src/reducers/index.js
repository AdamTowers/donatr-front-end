import { LOGOUT } from '../actions/types';
import { FETCH_USER } from '../actions/types';
import { FETCH_FUNDS } from '../actions/types';
import { SELECTED_FUND } from '../actions/types';
import { SELECTED_ORG } from '../actions/types';
import { UPDATE_FUND } from '../actions/types';

const initialState = {
  organizations: [],
  funds: [],
  user: {
    donations: []
  },
  selectedFund: {},
  selectedOrg: {
    funds: []
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      localStorage.clear()
      return {...state, user: { donations: [] } }
    case FETCH_FUNDS:
      return {...state, funds: action.payload }
    case FETCH_USER:
      return {...state, user: action.payload }
    case SELECTED_FUND:
      return {...state, selectedFund: action.payload }
    case SELECTED_ORG:
      return {...state, selectedOrg: action.payload }
    case UPDATE_FUND:
      return {...state, selectedFund: {
        ...state.selectedFund,
        raised: state.selectedFund.raised + action.payload,
        donation_count: state.selectedFund.donation_count + 1 }
      }
    default:
      return state;
  }
};
