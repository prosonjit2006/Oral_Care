import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import type {
  Doctor,
  DoctorPayload,
  DoctorState,
} from "../../type/interface/doctor.interface";
import {
  addNewDoctorFns,
  deleteDoctorFns,
  editDoctorFns,
  fetchDoctorListFns,
  publishDoctorFns,
  unpublishDoctorFns,
} from "../../api/doctor.function";

const initialState: DoctorState = {
  isLoading: false,
  isError: null,
  doctors: [],
  dialog: {
    open: false,
    selectedDoctor: null,
  },
};

//fetch doctors list
export const fetchDoctorList = createAsyncThunk(
  "admin/doctorlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchDoctorListFns();
      // console.log('Doctor res from thunk', res)
      return {
        success: true,
        message: "Successfully Doctors List Fetched",
        Doctor: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Faled to fetch doctors list",
      };
      return rejectWithValue(err.message);
    }
  },
);

//add new doctor
export const addNewDoctor = createAsyncThunk(
  "admin/addnewDoctor",
  async (data: DoctorPayload, { rejectWithValue }) => {
    try {
      const res = await addNewDoctorFns(data);
      console.log("response in addDoctor slice", res);
      return {
        success: true,
        message: "New Doctor added Successfully",
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

//edit doctor's details
export const editDoctor = createAsyncThunk(
  "admin/editDoctor",
  async (
    { id, data }: { id: string; data: DoctorPayload },
    { rejectWithValue },
  ) => {
    try {
      const res = await editDoctorFns({ id, data });
      //   console.log("res from edit slice", res);
      return {
        success: true,
        message: "Doctor details edited Successfully",
        Doctor: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed to edit Doctors Details",
      };
      return rejectWithValue(err.message);
    }
  },
);

// doctor status change
export const changeDoctorStatus = createAsyncThunk(
  "admin/DoctorStatusChange",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue },
  ) => {
    try {
      const res = status
        ? await unpublishDoctorFns(id)
        : await publishDoctorFns(id);
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

// doctor delete
export const deleteDoctor = createAsyncThunk(
  "admin/deleteDoctor",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteDoctorFns(id);
      toast.success("Doctor Deleted Successfully");
      return {
        success: true,
        message: "Doctor Deleted Successfully",
        response: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed To Delete Doctor",
      };
      return rejectWithValue(err.message);
    }
  },
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorDialogOpen: (state) => {
      state.dialog.open = true;
      state.dialog.selectedDoctor = null;
    },
    setEditDoctorDialogOpen: (state, action) => {
      state.dialog.open = true;
      state.dialog.selectedDoctor = action.payload;
    },
    setDoctorDialogClose: (state) => {
      state.dialog.open = false;
      state.dialog.selectedDoctor = null;
    },
    setselectedDoctor: (state, action) => {
      state.dialog.selectedDoctor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetching Doctor list
      .addCase(fetchDoctorList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchDoctorList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.doctors = action.payload.Doctor as unknown as Doctor[];
      })
      .addCase(fetchDoctorList.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // add Doctor list
      .addCase(addNewDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.doctors.unshift(action.payload.user as unknown as Doctor);
      })
      .addCase(addNewDoctor.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // edit Doctor list
      .addCase(editDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.doctors = state.doctors.map((item) =>
          item.$id === action.payload.Doctor.$id ? action.payload.Doctor : item,
        ) as unknown as Doctor[];
      })
      .addCase(editDoctor.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // change status Doctor list
      .addCase(changeDoctorStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.doctors = state.doctors.map((item) =>
          item.$id === action.payload.response.$id
            ? action.payload.response
            : item,
        ) as Doctor[];
      })
      .addCase(changeDoctorStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      })

      // delete Doctor list
      .addCase(deleteDoctor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.doctors = state.doctors.filter(
          (item) => item.$id !== action.meta.arg,
        );
      })
      .addCase(deleteDoctor.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export const {
  setDoctorDialogOpen,
  setEditDoctorDialogOpen,
  setDoctorDialogClose,
  setselectedDoctor,
} = doctorSlice.actions;
export default doctorSlice.reducer;
