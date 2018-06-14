import { FETCH_FUNDS } from './types';
import { FETCH_USER } from './types';
import { SELECTED_FUND } from './types';
import { SELECTED_ORG } from './types';
import { LOGOUT} from './types';

// export const fetchFunds = () => {
//   return (dispatch) => {
//     fetch('http://localhost:3000/api/v1/funds')
//      .then(res => res.json())
//      .then(funds => {
//        dispatch(getFunds(funds))
//      })
//   }
// }

export const fetchFunds = (funds) => {
  return {
    type: FETCH_FUNDS,
    payload: funds
  }
}

export const fetchUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user
  }
}

export const selectedFund = (fund) => {
  return {
    type: SELECTED_FUND,
    payload: fund
  }
}

export const selectedOrg = (org) => {
  return {
    type: SELECTED_ORG,
    payload: org
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}


/* COPY ME
export const myAction = (params) => {
  return {
    type: "MY_TYPE",
    payload: params
  }
}

export const myThunkAction = () => {
  return (dispatch) => {
    fetch()
     .then(res => res.json())
     .then(json => {
       dispatch(something with json)
     })
  }
}
*/
