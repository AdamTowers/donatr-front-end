// export function fetchDonations() {
//   return function(dispatch) {
//     fetch(`http://localhost:3000/api/v1/donors/${localStorage.getItem('user_id')}`,{
//       headers: {
//         'Authorization' : localStorage.getItem('token')
//       }
//     })
//     .then(res => res.json())
//     .then(donor => dispatch({
//       type: 'FETCH_DONATIONS',
//       payload: donor.donations
//     }))
//   }
// }

export function populateDonations(payload) {
  return {
    type: 'FETCH_DONATIONS',
    payload: payload
  }
}
