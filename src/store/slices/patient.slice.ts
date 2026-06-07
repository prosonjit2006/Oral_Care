// import type{ PatientPayload as PatientPayloadType  } from "./../../type/interface/patient.interface";
import {
  addNewPatientFns,
  deletePatientFns,
  editPatientFns,
  publishPatientFns,
  unpublishPatientFns,
} from "./../../api/patient.function";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  Patient,
  PatientPayload,
  PatientState,
} from "../../type/interface/patient.interface";
import { fetchPatientListFns } from "../../api/patient.function";
import { toast } from "sonner";

const initialState: PatientState = {
  isLoading: false,
  isError: null,
  patients: [],
  imagePreview: null,
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
      return {
        success: true,
        message: "Successfully Patient List Fetched",
        patient: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Faled to fetch patient list",
      };
      return rejectWithValue(err.message);
    }
  },
);

export const addNewPatient = createAsyncThunk(
  "admin/addnewpatient",
  async (data: PatientPayload, { rejectWithValue }) => {
    try {
      const res = await addNewPatientFns(data);
      console.log("response in addpatient slice", res);
      return {
        success: true,
        message: "New Patient added Successfully",
        user: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed to register",
      };
      return rejectWithValue(err.message);
    }
  },
);

export const editPatient = createAsyncThunk<
  any, // ! this is the response type but it is giving me error - Parient
  { id: string; data: PatientPayload },
  { rejectValue: string }
>("admin/editpatient", async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await editPatientFns({ id, data });
    //   console.log("res from edit slice", res);
    return {
      success: true,
      message: "New Patient added Successfully",
      patient: res,
    };
  } catch {
    const err = {
      success: false,
      message: "Failed to edit Patient",
    };
    return rejectWithValue(err.message);
  }
});

export const changePatientStatus = createAsyncThunk(
  "admin/patientStatusChange",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue },
  ) => {
    try {
      const res = status
        ? await unpublishPatientFns(id)
        : await publishPatientFns(id);
      return {
        success: true,
        message: "Successfully Chnaged Status",
        response: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed to change status",
      };
      return rejectWithValue(err.message);
    }
  },
);

export const deletePatient = createAsyncThunk(
  "admin/deletepatient",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deletePatientFns(id);
      toast.success("Patient Deleted Successfully");
      return {
        success: true,
        message: "Patient Deleted Successfully",
        response: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed To Delete Patient",
      };
      return rejectWithValue(err.message);
    }
  },
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientDialogOpen: (state) => {
      state.dialog.open = true;
      state.dialog.selectedPatient = null;
      state.imagePreview = null;
    },
    setEditPatientDialogOpen: (state, action) => {
      state.dialog.open = true;
      state.dialog.selectedPatient = action.payload;
    },
    setPatientDialogClose: (state) => {
      state.dialog.open = false;
      state.dialog.selectedPatient = null;
    },
    setselectedPatient: (state, action) => {
      state.dialog.selectedPatient = action.payload;
      // state.imagePreview = action.payload
    },
    setPatientImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetching patient list
      .addCase(fetchPatientList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPatientList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patients = action.payload.patient as unknown as Patient[];
        // console.log('patient data in payload ', action.payload)
      })
      .addCase(fetchPatientList.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // add patient list
      .addCase(addNewPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patients.unshift(action.payload.user as unknown as Patient);
      })
      .addCase(addNewPatient.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // edit patient list
      .addCase(editPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patients = state.patients.map((item) =>
          item.$id === action.payload.$id ? action.payload.patient : item,
        );
      })
      .addCase(editPatient.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // change status patient list
      .addCase(changePatientStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patients = state.patients.map((item) =>
          item.$id === action.payload.response.$id
            ? action.payload.response
            : item,
        ) as Patient[]; 
      })
      .addCase(changePatientStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // delete patient list
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.patients = state.patients.filter(
          (item) => item.$id !== action.meta.arg,
        );
      })
      .addCase(deletePatient.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export const {
  setPatientDialogOpen,
  setEditPatientDialogOpen,
  setPatientDialogClose,
  setselectedPatient,
  setPatientImagePreview,
} = patientSlice.actions;
export default patientSlice.reducer;
