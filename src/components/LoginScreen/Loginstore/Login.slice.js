import { createSlice } from "@reduxjs/toolkit";
import { _setLoginDetails, _setLoginPermissions } from "./LoginAction";

const initialState = {
  loginDetails: {},
  permissions: {},
};

const loginSlice = createSlice({
  name: "elog/admin/login",
  initialState,
  reducers: {
    resetAllLogs: () => initialState,
    setLoginDetails: _setLoginDetails,
    setLoginPermissions: _setLoginPermissions,
    logout: (state) => {
      state.loginDetails = {};
      state.permissions = {};
      localStorage.removeItem("token");
      localStorage.removeItem("permissions");
    },
  },
});

export const { resetAllLogs, setLoginDetails, logout, setLoginPermissions } =
  loginSlice.actions;

export default loginSlice.reducer;
