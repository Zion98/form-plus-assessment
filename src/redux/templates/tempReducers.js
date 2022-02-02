import TempTypes from "./tempTypes";

const INITIAL_STATE = {
  templates: [],
  isFetching: false,
  errorMessage: undefined,
};

const tempReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TempTypes.FETCH_TEMPLATES_START:
      return {
        ...state,
        isFetching: true,
      };

    case TempTypes.FETCH_TEMPLATES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        templates: action.payload,
      };

    case TempTypes.FETCH_TEMPLATES_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };

      

    default:
      return state;
  }
};

export default tempReducer;
