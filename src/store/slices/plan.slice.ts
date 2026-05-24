import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPlanFns,
  deletePlanFns,
  editPlanFns,
  fetchPlanListFns,
  publishPlanFns,
  unpublishPlanFns,
} from "../../api/plan.function";
import type {
  Plan,
  PlanPayload,
  PlanState,
} from "../../type/interface/plan.interface";
import { toast } from "sonner";

const initialState: PlanState = {
  isLoading: false,
  isError: null,
  plans: [],

  dialog: {
    open: false,
    selectedPlan: null,
  },
};

export const fetchPlanList = createAsyncThunk(
  "admin/planlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchPlanListFns();
      console.log("fetched data", res);
      return res;
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Failed to fetch plan list";
      toast.error("Failed to fetch plan list");
      return rejectWithValue(err);
    }
  },
);

export const addNewPlan = createAsyncThunk(
  "admin/addNewplan",
  async (data: PlanPayload, { rejectWithValue }) => {
    try {
      const res = await addPlanFns(data);
      return res;
    } catch (error) {
      const err = error instanceof Error ? error.message : "Failed to add plan";
      toast.error("Failed to add plan");
      return rejectWithValue(err);
    }
    // catch {
    //   const err = {
    //     success: false,
    //     message: "Failed to added",
    //   };
    //   return rejectWithValue(err);
    // }
  },
);

export const editPlan = createAsyncThunk(
  "admin/editplan",
  async (
    { id, data }: { id: string; data: PlanPayload },
    { rejectWithValue },
  ) => {
    try {
      const res = await editPlanFns({ id, data });
      //   console.log("res from edit slice", res);
      return res;
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Failed to update plan";
      toast.error("Failed to update plan");
      return rejectWithValue(err);
    }
  },
);

export const changeplanStatus = createAsyncThunk(
  "admin/statuschange",
  async (
    { id, status }: { id: string; status: boolean },
    { rejectWithValue },
  ) => {
    try {
      const res = status
        ? await unpublishPlanFns(id)
        : await publishPlanFns(id);
      return res;
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Failed to change status";
      toast.error("Failed to change status");
      return rejectWithValue(err);
    }
  },
);

export const deletePlan = createAsyncThunk(
  "admin/deletePlan",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deletePlanFns(id);
      //   console.log("res in slice sevice delete", res);
      toast.success("Service deleted successfully");
      return res;
    } catch (error) {
      const err =
        error instanceof Error ? error.message : "Failed to delete plan";
      toast.error("Failed to delete plan");
      return rejectWithValue(err);
    }
  },
);

const planSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setPlanDialogOpen: (state) => {
      state.dialog.open = true;
      state.dialog.selectedPlan = null;
    },
    setPlanDialogClose: (state) => {
      state.dialog.open = false;
      state.dialog.selectedPlan = null;
    },
    setEditPlanDialogOpen: (state, action) => {
      state.dialog.open = true;
      state.dialog.selectedPlan = action.payload;
    },
    setselectedPlan: (state, action) => {
      state.dialog.selectedPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // for fetching serviceList
      .addCase(fetchPlanList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPlanList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.plans = action.payload as unknown as Plan[];
      })
      .addCase(fetchPlanList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for adding new service
      .addCase(addNewPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.plans.unshift(action.payload as unknown as Plan);
      })
      .addCase(addNewPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for editing service
      .addCase(editPlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        state.plans = state.plans.map((item) =>
          item.$id === action.payload.$id ? action.payload : item,
        ) as Plan[];
      })
      .addCase(editPlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for changing status service
      .addCase(changeplanStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        state.plans = state.plans.map((item) =>
          item.$id === action.payload.$id ? action.payload : item,
        ) as Plan[];
      })
      .addCase(changeplanStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })

      // for deleting service
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.plans = state.plans.filter(
          (item) => item.$id !== action.meta.arg,
        );
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {
  setPlanDialogOpen,
  setPlanDialogClose,
  setEditPlanDialogOpen,
  setselectedPlan,
} = planSlice.actions;
export default planSlice.reducer;
