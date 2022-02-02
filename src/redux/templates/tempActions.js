import axios from "axios";
import TempTypes from "./tempTypes";
import request from "../../request";

export const fetchTemplatesStart = () => ({
  type: TempTypes.FETCH_TEMPLATES_START,
});

export const fetchTemplatesSuccess = (templatesData) => ({
  type: TempTypes.FETCH_TEMPLATES_SUCCESS,
  payload: templatesData,
});

export const fetchTemplatesFailure = (errorMessage) => ({
  type: TempTypes.FETCH_TEMPLATES_FAILURE,
  payload: errorMessage,
});

export const getTemplateDataAsync = () => {
  return async (dispatch) => {
    dispatch(fetchTemplatesStart());

    try {
      const allTemplates = await axios.get(request.MAIN_URL);

      const { data, status } = allTemplates;
      if (status === 200) {
        dispatch(fetchTemplatesSuccess(data));
        return;
      } else {
        dispatch(fetchTemplatesFailure(""));
      }
    } catch (error) {
      console.log(error)
      dispatch(fetchTemplatesFailure(""));
    }
  };
};
