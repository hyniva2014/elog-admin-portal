import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  elogLoaded: false,
};

const elogLoadSlice = createSlice({
  name: "elog/mobile",
  initialState: initialState,
  reducers: {
    resetElogDetails: () => initialState,
  },
});

export const { resetElogDetails } = elogLoadSlice.actions;

export default elogLoadSlice.reducer;
