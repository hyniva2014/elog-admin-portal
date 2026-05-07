import { combineReducers } from "@reduxjs/toolkit";
import elogLoadSlice from "../store/elogAdminLoads";
import loginSlice from "../components/LoginScreen/Loginstore/Login.slice";

export const rootReducer = combineReducers({
  elogLoadSlice,
  loginSlice,
});
