import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = patientSlice.actions;
export default patientSlice.reducer;
