import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "sonner";
import type {
  Appointment,
  AppointmentPayload,
  AppointmentState,
} from "../../type/interface/appointment.interface";
import {
  addNewAppointmentFns,
  deleteAppointmentFns,
  editAppointmentFns,
  fetchAppointmentListFns,
  publishAppointmentFns,
  unpublishAppointmentFns,
} from "../../api/appointment.function";

const initialState: AppointmentState = {
  isLoading: false,
  isError: null,
  Appointments: [],
  dialog: {
    open: false,
    selectedAppointment: null,
  },
};

export const fetchAppointmentList = createAsyncThunk(
  "admin/appointmentlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchAppointmentListFns();
      // console.log('Appointment res from thunk', res)
      return {
        success: true,
        message: "Successfully Appointment List Fetched",
        Appointment: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed to fetch Appointment list",
      };
      return rejectWithValue(err.message);
    }
  },
);

export const addNewAppointment = createAsyncThunk(
  "admin/addnewAppointment",
  async (data: AppointmentPayload, { rejectWithValue }) => {
    try {
      const res = await addNewAppointmentFns(data);
      console.log("response in addAppointment slice", res);
      return {
        success: true,
        message: "New Appointment added Successfully",
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

export const editAppointment = createAsyncThunk(
  "admin/editAppointment",
  async (
    { id, data }: { id: string; data: AppointmentPayload },
    { rejectWithValue },
  ) => {
    try {
      const res = await editAppointmentFns({ id, data });
      //   console.log("res from edit slice", res);
      return {
        success: true,
        message: "Appointment edited Successfully",
        Appointment: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed to edit Appointment",
      };
      return rejectWithValue(err.message);
    }
  },
);

export const changeAppointmentStatus = createAsyncThunk(
  "admin/AppointmentStatusChange",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue },
  ) => {
    try {
      const res = status
        ? await unpublishAppointmentFns(id)
        : await publishAppointmentFns(id);
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

export const deleteAppointment = createAsyncThunk(
  "admin/deleteAppointment",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteAppointmentFns(id);
      toast.success("Appointment Deleted Successfully");
      return {
        success: true,
        message: "Appointment Deleted Successfully",
        response: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Failed To Delete Appointment",
      };
      return rejectWithValue(err.message);
    }
  },
);

const AppointmentSlice = createSlice({
  name: "Appointment",
  initialState,
  reducers: {
    setAppointmentDialogOpen: (state) => {
      state.dialog.open = true;
      state.dialog.selectedAppointment = null;
    },
    setEditAppointmentDialogOpen: (state, action) => {
      state.dialog.open = true;
      state.dialog.selectedAppointment = action.payload;
    },
    setAppointmentDialogClose: (state) => {
      state.dialog.open = false;
      state.dialog.selectedAppointment = null;
    },
    setselectedAppointment: (state, action) => {
      state.dialog.selectedAppointment = action.payload;
      // state.imagePreview = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      // fetching Appointment list
      .addCase(fetchAppointmentList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchAppointmentList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.Appointments = action.payload
          .Appointment as unknown as Appointment[];
        // console.log('Appointment data in payload ', action.payload)
      })
      .addCase(fetchAppointmentList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // add Appointment list
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.Appointments.unshift(
          action.payload.user as unknown as Appointment,
        );
      })
      .addCase(addNewAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // edit Appointment list
      .addCase(editAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.Appointments = state.Appointments.map((item) =>
          item.$id === action.payload.Appointment.$id
            ? action.payload.Appointment
            : item,
        ) as unknown as Appointment[];
      })
      .addCase(editAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // change status Appointment list
      .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.Appointments = state.Appointments.map((item) =>
          item.$id === action.payload.response.$id
            ? action.payload.response
            : item,
        ) as Appointment[];
      })
      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // delete Appointment list
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.Appointments = state.Appointments.filter(
          (item) => item.$id !== action.meta.arg,
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  setAppointmentDialogOpen,
  setEditAppointmentDialogOpen,
  setAppointmentDialogClose,
  setselectedAppointment,
} = AppointmentSlice.actions;
export default AppointmentSlice.reducer;
