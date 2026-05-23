import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ServiceState } from "../../type/interface/service.interface";

const initialState: ServiceState = {
  isLoading: false,
  isError: null,
  services: [],

  dialog: {
    open: false,
    selectedService: null,
  },
};

export const fetchServiceList = createAsyncThunk(
  'admin/servicelist',
  async (_, {rejectWithValue})=> {
    try {
      const response = await 
    } catch {
       const err = {
         success: false,
         message: "Failed to Login",
       }
       return rejectWithValue(err)
    }
  }
)

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServideDialogOpen: (state) => {
      state.dialog.open = true;
      state.dialog.selectedService = null;
    },
    setServiceDialogClose: (state) => {
      state.dialog.open = false;
      state.dialog.selectedService = null;
    },
    setEditServiceDialogOpen: (state, action) => {
      state.dialog.open = true;
      state.dialog.selectedService = action.payload;
    },
    setSelectedService: (state, action) => {
      state.dialog.selectedService = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase()
  },
});

export const {
  setServideDialogOpen,
  setServiceDialogClose,
  setEditServiceDialogOpen,
  setSelectedService,
} = serviceSlice.actions;
export default serviceSlice.reducer;
