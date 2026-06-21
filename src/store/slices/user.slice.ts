import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../type/interface/user.interface";
import { fetchUserListFns } from "../../api/user.function";

const initialState: UserState = {
  isLoading: false,
  isError: null,
  user: [],
};

//fetch user list
export const fetchUserList = createAsyncThunk(
  "admin/user",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetchUserListFns();
      // console.log('Doctor res from thunk', res)
      return {
        success: true,
        message: "Successfully User List Fetched",
        data: res,
      };
    } catch {
      const err = {
        success: false,
        message: "Faled to fetch User list",
      };
      return rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetching payments list
      .addCase(fetchUserList.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.user = action.payload.data as unknown as any;
      })
      .addCase(fetchUserList.rejected, (state) => {
        state.isLoading = false;
        state.isError = null;
      });
  },
});

export default userSlice.reducer;
