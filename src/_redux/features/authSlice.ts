import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { CustomUser, SetCurrentUserParams } from "types/firebase/user";
import { LoginFormData } from "types/forms/login";
import { RegisterFormData } from "types/forms/register";
import { Status } from "types/redux";
import { history } from "utils/history";
import { authAPI, userAPI } from "_firebase";
import i18n from "localization/i18n";

export interface AuthState {
  user: CustomUser;
  status: {
    userInit: Status;
    register: Status;
    login: Status;
    logout: Status;
  };
  error: {
    userInit?: string;
    register?: string;
    login?: string;
    logout?: string;
  };
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {} as CustomUser,
  status: {
    userInit: Status.idle,
    register: Status.idle,
    login: Status.idle,
    logout: Status.idle,
  },
  error: {},
  isAuthenticated: false,
};

/**
 * Thunks
 */
export const register = createAsyncThunk<
  CustomUser,
  RegisterFormData,
  {
    rejectValue: string;
  }
>("auth/register", async (registerFormData: RegisterFormData, thunkAPI) => {
  try {
    const user = await authAPI.register(registerFormData);
    const userData: CustomUser = {
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid,
      username: registerFormData.username,
      birthDate: registerFormData.birthDate as Date,
    };
    await thunkAPI.dispatch(saveUserData(userData));
    return userData;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const setCurrentUser = createAsyncThunk<
  CustomUser,
  SetCurrentUserParams,
  {
    rejectValue: string;
  }
>("auth/setCurrentUser", async ({ uid }, thunkAPI) => {
  try {
    const userData = await userAPI.getUserData(uid);
    if (userData) {
      if (["/login", "/register"].includes(history.location.pathname)) {
        history.push("/");
      }
      return userData;
    } else {
      return thunkAPI.rejectWithValue(i18n.t("Couldn't fetch the user data"));
    }
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const saveUserData = createAsyncThunk<
  undefined,
  CustomUser,
  {
    rejectValue: string;
  }
>("auth/saveUserData", async (userData: CustomUser, thunkAPI) => {
  try {
    await userAPI.saveUserData(userData);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const login = createAsyncThunk<
  User,
  LoginFormData,
  {
    rejectValue: string;
  }
>("auth/login", async (loginFormData: LoginFormData, thunkAPI) => {
  try {
    return await authAPI.login(loginFormData);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const logout = createAsyncThunk<
  void,
  void,
  {
    rejectValue: string;
  }
>("auth/logout", async (_, thunkAPI) => {
  try {
    return await authAPI.logout();
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

/**
 * Reducers
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.status.register = Status.loading;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status.register = Status.succeeded;
      })
      .addCase(register.rejected, (state, action) => {
        state.status.register = Status.failed;
        state.error.register = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.status.login = Status.loading;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status.login = Status.succeeded;
      })
      .addCase(login.rejected, (state, action) => {
        state.status.login = Status.failed;
        state.error.login = action.payload;
      })
      .addCase(logout.pending, (state, action) => {
        state.status.logout = Status.loading;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status.logout = Status.succeeded;
        state.isAuthenticated = false;
        state.user = {} as CustomUser;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status.logout = Status.failed;
        state.error.logout = action.payload;
      })
      .addCase(setCurrentUser.pending, (state, action) => {
        state.status.userInit = Status.loading;
      })
      .addCase(setCurrentUser.fulfilled, (state, action) => {
        state.status.userInit = Status.succeeded;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(setCurrentUser.rejected, (state, action) => {
        state.status.userInit = Status.failed;
        state.error.userInit = action.payload;
      });
  },
});

/**
 * Action Creators
 */
// export const {  } = authSlice.actions;

export default authSlice.reducer;
