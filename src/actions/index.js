import { FETCH_FUNDS } from './types';

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


// return fetch('http://localhost:3000/api/v1/funds')
//   .then(res => res.json())
//   .then(funds => {
//     dispatch({type: "FETCH_FUNDS", payload: funds})
//   })

// export function fetchJournal(user_id, history) {
//   return dispatch => {
//     return fetch(`http://localhost:3000/api/v1/journals/`, {
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       }
//     })
//       .then(res => res.json())
//       .then(journal => {
//         dispatch({ type: GET_JOURNAL, journal: journal[0] });
//       });
//   };
// }
