import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = serviceSlice.actions;
export default serviceSlice.reducer;
