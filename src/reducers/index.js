const initialState = {
  donations: [],
  newDonation: {}
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DONATIONS':
      return {
        ...state,
        donations: action.payload
      }
    default:
      return state;
  }
};
