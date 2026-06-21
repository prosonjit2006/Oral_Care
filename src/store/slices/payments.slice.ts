import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PaymentRecordState } from "../../type/interface/paymentsHistory.interface";
import { fetchPaymentsRecordListFns } from "../../api/paymentsHistory.function";

const initialState: PaymentRecordState = {
  isLoading: false,
  isError: null,
  Payments: [],
};

//fetch doctors list
export const fetchPaymentsRecordList = createAsyncThunk(
  "admin/payments",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchPaymentsRecordListFns();
      // console.log('Doctor res from thunk', res)
      return {
        success: true,
        message: "Successfully Doctors List Fetched",
        data: res,
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

// change payment status
// export const changeDoctorStatus = createAsyncThunk(
//   "admin/DoctorStatusChange",
//   async (
//     { id, status }: { id: string; status: boolean },
//     { rejectWithValue },
//   ) => {
//     try {
//       const res = status
//         ? await unpublishDoctorFns(id)
//         : await publishDoctorFns(id);
//       return {
//         success: true,
//         message: "Successfully Chnaged Status",
//         response: res,
//       };
//     } catch {
//       const err = {
//         success: false,
//         message: "Failed to change status",
//       };
//       return rejectWithValue(err.message);
//     }
//   },
// );

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetching payments list
      .addCase(fetchPaymentsRecordList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchPaymentsRecordList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.Payments = action.payload.data;
      })
      .addCase(fetchPaymentsRecordList.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      });
    // change payment status
    // .addCase(changeDoctorStatus.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = null;
    //   state.doctors = state.doctors.map((item) =>
    //     item.$id === action.payload.response.$id
    //       ? action.payload.response
    //       : item,
    //   ) as Doctor[];
    // })
    // .addCase(changeDoctorStatus.rejected, (state) => {
    //   state.isLoading = false;
    //   state.isError = null;
    // })
  },
});

// export const {} = paymentsSlice.actions;
export default paymentSlice.reducer;
