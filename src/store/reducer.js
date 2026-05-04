import { combineReducers } from "@reduxjs/toolkit";
import elogLoadSlice from "../store/elogAdminLoads";

export const rootReducer = combineReducers({
  elogLoadSlice,
});
