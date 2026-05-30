import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  Patient,
  PatientState,
} from "../../type/interface/patient.interface";
import { fetchPatientListFns } from "../../api/patient.function";

const initialState: PatientState = {
  isLoading: false,
  isError: null,
  patients: [],
  dialog: {
    open: false,
    selectedPatient: null,
  },
};

export const fetchPatientList = createAsyncThunk(
  "admin/patientlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchPatientListFns();
      // console.log('patient res from thunk', res)
      return res;
    } catch {
      const err = {
        success: false,
        message: "Faled to fetch patient list",
      };
      return rejectWithValue(err.message);
    }
  },
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatientList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPatientList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patients = action.payload;
        // console.log('patient data in payload ', action.payload)
      })
      .addCase(fetchPatientList.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export const {} = patientSlice.actions;
export default patientSlice.reducer;
