import { FETCH_FUNDS } from './types';
import { FETCH_USER } from './types';
import { SELECT_FUND } from '../actions/types';

// export const fetchFunds = () => {
//   return (dispatch) => {
//     fetch('http://localhost:3000/api/v1/funds')
//      .then(res => res.json())
//      .then(funds => {
//        dispatch(getFunds(funds))
//      })
//   }
// }

export const getFunds = (funds) => {
  return {
    type: FETCH_FUNDS,
    payload: funds
  }
}

export const getUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user
  }
}

export const selectFund = (fund) => {
  return {
    type: SELECT_FUND,
    payload: fund
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
