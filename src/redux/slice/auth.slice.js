import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";
import { setMessage } from "./message.slice";
const user = JSON.parse(localStorage.getItem("user"));

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (data, thunkAPI) => {
    try {
      const res = await AuthService.signUp(data);
      thunkAPI.dispatch(setMessage(res.message));
      return res.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (data, thunkAPI) => {
    try {
      const res = await AuthService.signIn(data);
      return { user: res.data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const signOut = createAsyncThunk("auth/logout", () => {
  AuthService.signOut();
});

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: { name: "", role: "" } };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [signUp.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signUp.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [signIn.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [signIn.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = { data: { name: "", role: "" } };
    },
    [signOut.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = { data: { name: "", role: "" } };
    },
  },
});

const { reducer } = authSlice;
export default reducer;
