import filterTypes from "./filterTypes";

const initialState = {
  searchResults: [],
  inputValue: "",
  errorMessage: null,
  isFetching: false,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case filterTypes.CHANGE_FILTER_INPUT_VALUE:
      return {
        ...state,
        inputValue: action.payload,
      };
    case filterTypes.CLEAR_FILTER_INPUT_VALUE:
      return {
        ...state,
        inputValue: "",
      };
    case filterTypes.FETCH_FILTER_RESULTS_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case filterTypes.FETCH_FILTER_RESULTS_SUCCESS:
      return {
        ...state,
        searchResults: [...action.payload],
        errorMessage: false,
        isFetching: false,
      };
    case filterTypes.FETCH_FILTER_RESULTS_FAILURE:
      return {
        ...state,
        searchResults: [],
        errorMessage: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default searchReducer;
