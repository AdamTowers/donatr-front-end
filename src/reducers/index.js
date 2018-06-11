const initialState = {
  funds: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_FUNDS":
      debugger
      return {...state, funds: [...state.funds, action.payload]}
    default:
      return state;
  }
};
