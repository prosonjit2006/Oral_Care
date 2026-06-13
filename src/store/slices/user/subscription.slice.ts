// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { Subscription, SubscriptionState } from "../../../type/interface/user/subscription.interface";
// import { fetchPlanListFns } from "../../../api/plan.function";

// const initialState: SubscriptionState={
// plans: []
// }

// export const fetchSubscriptions = createAsyncThunk(
//   "subcriptions",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetchPlanListFns();
//       console.log("fetched data", res);
//       return {
//         success: true,
//         message: 'Subscriptions fetched successfully',
//         data: res
//       };
//     } catch {
//       const err = {
//         success: false,
//         message: "Failed to fetch plan list",
//       };
//       return rejectWithValue(err.message);
//     }
//   },
// );

// export const subscriptionSlice = createSlice(
//    { name: 'subscription',
//     initialState,
// reducers: {},
// extraReducers: (builder)=> {
//      builder
//           // for fetching plan
//         //   .addCase(fetchPlanList.pending, (state) => {
//         //     state.isLoading = true;
//         //     state.isError = null;
//         //   })
//           .addCase(fetchSubscriptions.fulfilled, (state, action) => {
//               state.plans = action.payload.data as unknown as Subscription;
//             // state.isLoading = false;
//             // state.isError = null;
//           })
//         //   .addCase(fetchPlanList.rejected, (state, action) => {
//         //     state.isLoading = false;
//         //     state.isError = action.payload as string;
//         //   })
// }}
// )

// export const {}=subscriptionSlice.actions
// export default subscriptionSlice.reducer