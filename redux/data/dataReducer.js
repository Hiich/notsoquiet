const initialState = {
  loading: false,
  patronSupply: 0,
  benefactorSupply: 0,
  error: false,
  errorMsg: '',
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: '',
      }
    case 'CHECK_DATA_SUCCESS':
      return {
        ...state,
        loading: false,
        benefactorSupply: action.payload.benefactorSupply,
        patronSupply: action.payload.patronSupply,
        error: false,
        errorMsg: '',
      }
    case 'CHECK_DATA_FAILED':
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      }
    default:
      return state
  }
}

export default dataReducer
