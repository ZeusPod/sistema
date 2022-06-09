import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "../../services/customer.service";
const initialState = {
  customers: [],
  countCustomers: 0,
};

export const createCustomer = createAsyncThunk(
  "customer/create",
  async (data) => {
    const res = await customerService.createCustomer(data);
    return res.data;
  }
);

export const updateCustomer = createAsyncThunk(
  "customer/update",
  async (data) => {
    const res = await customerService.updateCustomer(data);
    return res.data;
  }
);

export const deleteCustomer = createAsyncThunk(
  "customer/delete",
  async (id) => {
    const res = await customerService.deleteCustomer(id);
    return res.data;
  }
);

export const getCustomerById = createAsyncThunk(
  "customer/getById",
  async (id) => {
    const res = await customerService.getCustomerById(id);
    return res.data;
  }
);

export const getCustomers = createAsyncThunk("customer/get", async () => {
  const res = await customerService.getCustomers();
  return res.data;
});

export const getPaginatedCustomer = createAsyncThunk(
  "customer/paginated",
  async ({ column, page, limit, search }) => {
    const res = await customerService.getPaginatedCustomer(
      column,
      page,
      limit,
      search
    );
    return res.data;
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: {
    [createCustomer.fulfilled]: (state, action) => {
      state.countCustomers = state.countProducts + 1;
      state.customers.push(action.payload.data);
    },
    [updateCustomer.fulfilled]: (state, action) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.data.id
      );
      state.customers[index] = {
        ...state.customers[index],
        ...action.payload.data,
      };
    },
    [deleteCustomer.fulfilled]: (state, action) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.data.id
      );
      state.customers.splice(index, 1);
    },
    [getCustomerById.fulfilled]: (state, action) => {
      const index = state.customers.findIndex(
        (customer) => customer.id === action.payload.data.id
      );
      state.customers[index] = { ...state[index], ...action.payload.data };
    },
    [getPaginatedCustomer.fulfilled]: (state, action) => {
      state.customers = action.payload.data;
      state.countCustomers = action.payload.countData;
    },
  },
});

const { reducer } = customerSlice;
export default reducer;
