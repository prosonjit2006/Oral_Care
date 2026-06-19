import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type {
  Authstate,
  LoginPayload,
  SignupPayload,
  User,
} from "../../type/interface/auth.interface";
import { loginUserfns, registerUserfns } from "../../api/auth.function";
import Cookies from "js-cookie";
import { account } from "../../lib/Appwrite.config";
import { toast } from "sonner";

// fetching the data from the local stroage
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
  isLoginDialogOpen: false,
  isSignupDialogOpen: false,
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

export const LoginUser = createAsyncThunk(
  "admin/login",
  async (data: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await loginUserfns(data);
      return res;
    } catch {
      const err = {
        success: false,
        message: "Failed to login ",
      };
      return rejectWithValue(err.message);
    }
  },
);

// export const LoginUser = createAsyncThunk<
//   any, // responsetype -
//   LoginPayload, // payloadTYpe
//   { rejectValue: string }
// >("auth/login", async (data: LoginPayload, { rejectWithValue }) => {
//   console.log("data comming in authslice", data);
//   try {
//     const response = await loginUserfns(data);
//     console.log("response in auth slice", response);
//     return response;
//   } catch {
//     const err = {
//       success: false,
//       message: "Failed to Login",
//     };
//     return rejectWithValue(err.message);
//   }
// });

export const LogOutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      // appwrite session delete
      await account.deleteSession("current");

      // remove cookies
      Cookies.remove("token");
      Cookies.remove("user");
      Cookies.remove("role");
      Cookies.remove("patient");

      toast.success("Logout successfully");
    } catch {
      const err = {
        success: false,
        message: "Failed to Logout",
      };
      return rejectWithValue(err.message);
    }
  },
);

// export const LogOutUser = createAsyncThunk<
//   any, // responsetype -
//   LoginPayload, // payloadTYpe
//   { rejectValue: string }
// >("auth/logout", async (data: LoginPayload, { rejectWithValue }) => {})

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openLogin: (state) => {
      state.isSignupDialogOpen = false;
      state.isLoginDialogOpen = true;
    },

    openSignup: (state) => {
      state.isLoginDialogOpen = false;
      state.isSignupDialogOpen = true;
    },

    closeDialog: (state) => {
      state.isLoginDialogOpen = false;
      state.isSignupDialogOpen = false;
    },
    setImagePreview: (state, action) => {
      state.imagePreview = action.payload;
    },
    logout: (state) => {
      state.isAuthenticate = false;
      state.user = null;
      state.role = null;
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
      })
      // .addCase(LogOutUser.pending, (state) => {
      //   state.isLoading = true;
      //   state.isError = null;
      // })
      .addCase(LogOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = null;

        state.isAuthenticate = false;
        state.user = null;
        state.role = null;
      })
      .addCase(LogOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      })
      .addCase(LoginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;

        if (!action.payload?.user) {
          state.isAuthenticate = false;
          return;
        }

        state.isAuthenticate = true;
        state.user = action.payload.user as unknown as User;
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

export const { setImagePreview, logout, openLogin, openSignup, closeDialog } =
  authSlice.actions;
export default authSlice.reducer;
