import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  ServicePayload,
  ServiceState,
} from "../../type/interface/service.interface";
import {
  addServiceFns,
  deleteServiceFns,
  editServiceFns,
  fetchServiceListFns,
  publishServiceFns,
  unpublishServiceFns,
} from "../../api/service.function";
import { toast } from "sonner";

const initialState: ServiceState = {
  isLoading: false,
  isError: null,
  services: [],
  imagePreview: null,

  dialog: {
    open: false,
    selectedService: null,
  },
};

export const fetchServiceList = createAsyncThunk(
  "admin/servicelist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchServiceListFns();
      // console.log("fetched data", res);
      return res;
    } catch {
      const err = {
        success: false,
        message: "Failed to Login",
      };
      return rejectWithValue(err);
    }
  },
);

export const addNewService = createAsyncThunk(
  "admin/addnewservice",
  async (data: ServicePayload, { rejectWithValue }) => {
    try {
      const res = await addServiceFns(data);
      return res;
    } catch {
      const err = {
        success: false,
        message: "Failed to added",
      };
      return rejectWithValue(err);
    }
  },
);

export const editService = createAsyncThunk(
  "admin/editservice",
  async (
    { id, data }: { id: string; data: ServicePayload },
    { rejectWithValue },
  ) => {
    try {
      const res = await editServiceFns({ id, data });
      console.log("res from edit slice", res);
      return res;
    } catch {
      const err = {
        success: false,
        message: "Failed to edit",
      };
      return rejectWithValue(err);
    }
  },
);

export const changeStatus = createAsyncThunk(
  "admin/statuschange",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue },
  ) => {
    try {
      const res = status
        ? await unpublishServiceFns(id)
        : await publishServiceFns(id);
      return res;
    } catch {
      const err = {
        success: false,
        message: "Failed to change status",
      };
      return rejectWithValue(err);
    }
  },
);

export const deleteService = createAsyncThunk(
  "admin/deleteservice",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteServiceFns(id);
      console.log("res in slice sevice delete", res);
      toast.success("Service deleted successfully");
      return res;
    } catch {
      const err = {
        success: false,
        message: "Failed to delete",
      };
      return rejectWithValue(err);
    }
  },
);

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setServiceDialogOpen: (state) => {
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

      console.log("img res from setedit part in slice", action.payload.image);
      state.imagePreview = action.payload.image;
    },
    setSelectedService: (state, action) => {
      state.dialog.selectedService = action.payload;
    },
    setServiceImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // for fetching serviceList
      .addCase(fetchServiceList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchServiceList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.services = action.payload;
      })
      .addCase(fetchServiceList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for adding new service
      // .addCase(addNewService.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = null;
      // })
      .addCase(addNewService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.services.unshift(action.payload);
      })
      .addCase(addNewService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for editing service
      // .addCase(editService.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = null;
      // })
      .addCase(editService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        state.services = state.services.map((item) =>
          item.$id === action.payload.$id ? action.payload : item,
        );
      })
      .addCase(editService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for changing status service
      // .addCase(changeStatus.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = null;
      // })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        state.services = state.services.map((item) =>
          item.$id === action.payload.$id ? action.payload : item,
        );
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for deleting service
      // .addCase(deleteService.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = null;
      // })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.services = state.services.filter(
          (item) => item.$id !== action.meta.arg,
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  setServiceDialogOpen,
  setServiceDialogClose,
  setEditServiceDialogOpen,
  setSelectedService,
  setServiceImagePreview,
} = serviceSlice.actions;
export default serviceSlice.reducer;
