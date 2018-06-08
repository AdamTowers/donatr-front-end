import { FETCH_DONATIONS, NEW_DONATION } from './types';

export function fetchDonations() {
  return function(dispatch) {
    fetchDonations(`http://localhost:3000/api/v1/donors/${localStorage.getItem('user_id')}`,{
      headers: {
        'Authorization' : localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(donor => dispatch({
      type: FETCH_DONATIONS,
      payload: donor
    }))
  }
}
