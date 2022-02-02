import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import tempReducer from "./templates/tempReducers";
import filterReducer from "./filters/filterReducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["templates",],
};

const rootReducer = combineReducers({
  templates: tempReducer,
  filters: filterReducer,
});

// export default rootReducer;

export default persistReducer(persistConfig, rootReducer); 
