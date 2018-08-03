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
    donations: [],
    funds: []
  },
  selectedFund: {
    id: ''
  },
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
        raised: parseFloat(state.selectedFund.raised) + parseFloat(action.payload),
        percent_raised: state.selectedFund.percent_raised + (action.payload/state.selectedFund.goal * 100)
       }
      }
    default:
      return state;
  }
};
