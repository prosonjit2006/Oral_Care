import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  Authstate,
  LoginPayload,
  SignupPayload,
} from "../../type/interface/auth.interface";
import { loginUserfns, registerUserfns } from "../../api/auth.function";
import Cookies from "js-cookie";
import { account } from "../../lib/Appwrite.config";

const user = Cookies.get("user")
  ? JSON.parse(Cookies.get("user") as string)
  : null;
const role = Cookies.get("role") ?? null;
const token = Cookies.get("token") ?? null;

const initialState: Authstate = {
  isLoading: false,
  isError: null,
  isAuthenticate: !!token,
  user: user,
  role: role,
  imagePreview: null,
};

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (data: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await registerUserfns(data);
      console.log("response in auth slice", response);
      return {
        success: true,
        message: "Register Successfully",
        user: response,
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

export const LoginUser = createAsyncThunk<
  any, // responsetype -
  LoginPayload, // payloadTYpe
  { rejectValue: string }
>("auth/login", async (data: LoginPayload, { rejectWithValue }) => {
  console.log("data comming in authslice", data);
  try {
    const response = await loginUserfns(data);
    console.log("response in auth slice", response);
    return response;
  } catch {
    const err = {
      success: false,
      message: "Failed to Login",
    };
    return rejectWithValue(err.message);
  }
});

// export const LogOutUser = createAsyncThunk<
//   any, // responsetype -
//   LoginPayload, // payloadTYpe
//   { rejectValue: string }
// >("auth/logout", async (data: LoginPayload, { rejectWithValue }) => {})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
    logout:  (state) => {
        account.deleteSession("current");
      state.isAuthenticate = false;
      state.user = null;
      state.role = null;
      Cookies.remove('token')
      Cookies.remove('user')
      Cookies.remove('role')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(RegisterUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;
        state.imagePreview = null;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
    builder
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        console.log("login action fullfilled", action.payload);
        state.isAuthenticate = true;
        state.user = action.payload.user;
        state.role = action.payload.user.role;
        Cookies.set("user", JSON.stringify(action.payload.user));
        Cookies.set("role", action.payload.user.role);
        Cookies.set("token", "true");
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const { setImagePreview, logout } = authSlice.actions;
export default authSlice.reducer;
