import { createSelector } from "reselect";

const selectTemplates = (state) => state.templates;

export const selectAllTemplates = createSelector(
  [selectTemplates],
  (templates) => templates.templates
);

export const selectTemplatesFetching = createSelector(
  [selectTemplates],
  (templates) => templates.isFetching
);

export const selectTemplatesErrorMessage = createSelector(
  [selectTemplates],
  (templates) => templates.errorMessage
);
