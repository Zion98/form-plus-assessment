import { createSelector } from "reselect";

const selectFilters = (state) => state.filters;

export const selectSearchResults = createSelector(
  [selectFilters],
  (filters) => filters.searchResults
);

export const selectInputValue = createSelector(
  [selectFilters],
  (filters) => filters.inputValue
);

export const selectFilterError = createSelector(
  [selectFilters],
  (filters) => filters.errorMessage
);

export const selectFilterIsFetching = createSelector(
  [selectFilters],
  (filters) => filters.isFetching
);
