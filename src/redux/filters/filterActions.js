import axios from "axios";
import requests from "../../request";
import filterTypes from "./filterTypes";

export const changeFilterInputValue = (inputValue) => ({
  type: filterTypes.CHANGE_FILTER_INPUT_VALUE,
  payload: inputValue,
});

export const clearFilterInputValue = () => ({
  type: filterTypes.CLEAR_FILTER_INPUT_VALUE,
});

export const fetchFilterResultsRequest = () => ({
  type: filterTypes.FETCH_FILTER_RESULTS_REQUEST,
});

export const fetchFilterResultsSuccess = (searchResults) => ({
  type: filterTypes.FETCH_FILTER_RESULTS_SUCCESS,
  payload: searchResults,
});

export const fetchFilterResultsFailure = (errorMessage) => ({
  type: filterTypes.FETCH_FILTER_RESULTS_FAILURE,
  payload: errorMessage,
});

export const fetchFilterResultsAsync = (searchQuery) => {
  return async (dispatch) => {
    dispatch(fetchFilterResultsRequest());

    try {
      const allTemplates = await axios.get(requests.MAIN_URL);
      const { data, status } = allTemplates;
      if (status === 200 && searchQuery !== "") {
        const filteredResults = data.filter((template) =>
          template.name.includes(searchQuery)
        );

        return dispatch(fetchFilterResultsSuccess(filteredResults));
      } else if (status === 200 && searchQuery.length === 0) {
        dispatch(fetchFilterResultsSuccess(data));
      } else {
        dispatch(fetchFilterResultsFailure(""));
      }
    } catch (error) {
      dispatch(fetchFilterResultsFailure(error));
    }
  };
};

export const fetchFilterResultsAsync2 = (searchQuery) => {
  return async (dispatch) => {
    dispatch(fetchFilterResultsRequest());

    const allTemplates = await axios.get(requests.MAIN_URL);
    const { data, status } = allTemplates;

    if (status === 200 && Object.keys(searchQuery)[0] === "category") {
      dispatch(changeFilterInputValue(Object.values(searchQuery)[0]));

      const filteredResults = data.filter((template) =>
        template.category.filter((cat) => cat === searchQuery)
      );

      return dispatch(fetchFilterResultsSuccess(filteredResults));
    } else if (status === 200 && Object.keys(searchQuery)[0] === "order") {
      if (Object.values(searchQuery)[0] === "Ascending") {
        const ascFilteredDate = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return dispatch(fetchFilterResultsSuccess(ascFilteredDate));
      } else if (Object.values(searchQuery)[0] === "Descending") {
        const descFilteredDate = data.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        return dispatch(fetchFilterResultsSuccess(descFilteredDate));
      } else if (Object.values(searchQuery)[0] === "Default") {
        return dispatch(fetchFilterResultsSuccess(data));
      }

      return;
    } else if (Object.keys(searchQuery)[0] === "date") {
      if (Object.values(searchQuery)[0] === "Ascending") {
        const filteredResults = data.sort(
          (a, b) =>
            new Date(a.created).getTime() - new Date(b.created).getTime()
        );
        return dispatch(fetchFilterResultsSuccess(filteredResults));
      } else if (Object.values(searchQuery)[0] === "Descending") {
        const filteredResults = data.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime()
        );
        return dispatch(fetchFilterResultsSuccess(filteredResults));
      } else if (Object.values(searchQuery)[0] === "Default") {
        return dispatch(fetchFilterResultsSuccess(data));
      }
    }

    // const filteredResults = data.filter((template) =>
    //   template.name.includes(searchQuery)
    // );
    // dispatch(fetchFilterResultsSuccess(filteredResults));
    // return;
    else if (status === 200 && searchQuery.length === 0) {
      dispatch(fetchFilterResultsSuccess(data));
    } else {
      dispatch(fetchFilterResultsFailure(""));
    }
  };
};
