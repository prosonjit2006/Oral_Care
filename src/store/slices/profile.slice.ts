import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  EditProfilePayload,
  Profile,
  ProfileSate,
} from "../../type/interface/profile.interface";
import {
  fetchPatientDataFns,
  updatePatientProfileFns,
} from "../../api/profile.function";

const initialState: ProfileSate = {
  isLoading: false,
  isError: null,
  patientData: null,
  dialog: {
    open: false,
    selectedProfile: null,
  },
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

export const updatePatientProfile = createAsyncThunk(
  "patient/update",
  async (
    {
      email,
      data,
    }: {
      email: string;
      data: EditProfilePayload;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await updatePatientProfileFns({
        email,
        data,
      });

      return res;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Update failed",
      );
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileDialogOpen: (state) => {
      state.dialog.open = true;
    },

    setProfileDialogClose: (state) => {
      state.dialog.open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaitentData.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPaitentData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patientData = action.payload.patient as unknown as Profile;
      })
      .addCase(fetchPaitentData.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })
      .addCase(updatePatientProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        if (state.patientData) {
          state.patientData = action.payload as Profile;
        }

        state.dialog.open = false;
      })
      .addCase(updatePatientProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { setProfileDialogOpen, setProfileDialogClose } =
  profileSlice.actions;
export default profileSlice.reducer;
