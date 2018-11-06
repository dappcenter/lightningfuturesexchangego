import { i18nReducer } from "./i18n-reducer";
import { reducer as reducerForm } from 'redux-form';

import concatenateReducers from 'redux-concatenate-reducers';
import { combineReducers } from "redux";
import { userReducer } from "./user-reducer";

const concatenatedReducers = concatenateReducers([
  i18nReducer,
  userReducer
]);

export default combineReducers({
  app: concatenatedReducers,
  form: reducerForm
});
