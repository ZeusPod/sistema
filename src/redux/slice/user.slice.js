import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/user.service";

const initialState = {
  users: [],
  countUsers: 0,
};

export const createUser = createAsyncThunk("user/create", async (data) => {
  const res = await UserService.createUser(data);
  return res.data;
});

export const updateUser = createAsyncThunk("user/update", async (data) => {
  const res = await UserService.updateUser(data);
  return res.data;
});

export const desactiveUser = createAsyncThunk("user/desactive", async (id) => {
  const res = await UserService.desactiveUser(id);
  return res.data;
});

export const activeUser = createAsyncThunk("user/active", async (id) => {
  const res = await UserService.activeUser(id);
  return res.data;
});

export const getPaginatedUser = createAsyncThunk(
  "user/paginated",
  async ({ column, page, limit, search }) => {
    const res = await UserService.getPaginatedUser(column, page, limit, search);
    return res.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: {
    [createUser.fulfilled]: (state, action) => {
      state.users.push(action.payload.data);
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.data.id
      );
      state.users[index] = action.payload.data;
    },
    [activeUser.fulfilled]: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.data.id
      );
      state.users[index] = { ...state.users[index], active: true };
    },
    [desactiveUser.fulfilled]: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.data.id
      );
      state.users[index] = { ...state.users[index], active: false };
    },
    [getPaginatedUser.fulfilled]: (state, action) => {
      state.users = action.payload.data;
      state.countUsers = action.payload.countData;
    },
  },
});

const { reducer } = userSlice;
export default reducer;
