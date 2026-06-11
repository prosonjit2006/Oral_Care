import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  BookingPayload,
  BookingState,
} from "../../type/interface/booking.interface";
import { bookedServiceFns, fetchPatientDataFns } from "../../api/booking.function";
import type { Patient } from "../../type/interface/patient.interface";

const initialState: BookingState = {
  isLoading: false,
  isError: null,
  patient: null,
};

export const fetchPaitentData = createAsyncThunk(
  "patient/data",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await fetchPatientDataFns(email);
      // console.log("fetched data", res);
      return {
        success: true,
        message: "Successfully fetched patient profile data",
        patient: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed to patient list",
      };
      return rejectWithValue(err.message);
    }
  },
);

export const bookedService = createAsyncThunk(
  "booking/create",
  async (data: BookingPayload, { rejectWithValue }) => {
    try {
      const res = await bookedServiceFns(data);
      return {
        success: true,
        message: "Appointment booked successfully",
        booking: res,
      };
    } catch {
      return rejectWithValue("Failed to book appointment");
    }
  },
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaitentData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPaitentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patient = action.payload.patient as unknown as Patient;
      })
      .addCase(fetchPaitentData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })
      .addCase(bookedService.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(bookedService.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(bookedService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {} = bookingSlice.actions;
export default bookingSlice.reducer;
