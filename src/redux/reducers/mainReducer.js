const initialState = {
  data: [],
  loading: false
};

export default function getPriority(state = initialState, action) {
  switch (action.type) {
    case 'GET_PRIORITY_FULFILLED':
      return { data: action.payload, loading: false };
    case 'GET_PRIORITY_PENDING':
      return { ...state, loading: true };
    default:
      return state;
  }
}
