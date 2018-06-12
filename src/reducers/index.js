import { FETCH_USER } from '../actions/types';
import { FETCH_ORGS } from '../actions/types';

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
    case FETCH_ORGS:
      let fundsArr = []
      action.payload.forEach(org => {
        fundsArr = fundsArr.concat(org.funds)
      })
      return {...state, orgs: action.payload, funds: fundsArr }
    case FETCH_USER:
      return {...state, user: action.payload }
    default:
      return state;
  }
};
