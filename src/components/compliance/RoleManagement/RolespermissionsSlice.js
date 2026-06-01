import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  permissions: {},
};

const rolespermissionsSlice = createSlice({
  name: "rolespermissions",
  initialState,
  reducers: {
    setRolePermissions: (state, action) => {
      state.permissions = action.payload;
    },

    clearRolePermissions: (state) => {
      state.permissions = {};
    },
  },
});

export const {
  setRolePermissions,
  clearRolePermissions,
} = rolespermissionsSlice.actions;

export default rolespermissionsSlice.reducer;