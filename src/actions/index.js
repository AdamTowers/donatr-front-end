import { FETCH_ORGS } from './types';
import { FETCH_USER } from './types';

// export const fetchFunds = () => {
//   return (dispatch) => {
//     fetch('http://localhost:3000/api/v1/funds')
//      .then(res => res.json())
//      .then(funds => {
//        dispatch(getFunds(funds))
//      })
//   }
// }

export const fetchOrgs = (orgs) => {
  return {
    type: FETCH_ORGS,
    payload: orgs
  }
}

export const getUser = (user) => {
  return {
    type: FETCH_USER,
    payload: user
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
