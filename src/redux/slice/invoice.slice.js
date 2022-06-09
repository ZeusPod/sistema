import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InvoiceService from "../../services/invoice.service";
const initialState = {
  invoices: [],
  countInvoices: 0,
};

export const getPaginatedInvoices = createAsyncThunk(
  "invoice/paginated",
  async ({ column, page, limit, search }) => {
    const res = await InvoiceService.getPaginatedInvoices(
      column,
      page,
      limit,
      search
    );
    return res.data;
  }
);

export const getInvoicesByUserIdPending = createAsyncThunk(
  "invoice/client",
  async ({ id, column, page, limit, search }) => {
    const res = await InvoiceService.getInvoicesByIdClientPending(
      id,
      column,
      page,
      limit,
      search
    );
    return res.data;
  }
);

export const getInvoicesByUserIdSuccess = createAsyncThunk(
  "invoice/client",
  async ({ id, column, page, limit, search }) => {
    const res = await InvoiceService.getInvoicesByIdClientSuccess(
      id,
      column,
      page,
      limit,
      search
    );
    return res.data;
  }
);

const invoiceSlice = createSlice({
  name: "invoice",
  initialState,
  extraReducers: {
    [getPaginatedInvoices.fulfilled]: (state, action) => {
      state.invoices = action.payload.data;
      state.countInvoices = action.payload.countData;
    },
    [getInvoicesByUserIdPending.fulfilled]: (state, action) => {
      state.invoices = action.payload.data;
      state.countInvoices = action.payload.countData;
    },
    [getInvoicesByUserIdSuccess.fulfilled]: (state, action) => {
      state.invoices = action.payload.data;
      state.countInvoices = action.payload.countData;
    },
  },
});

const { reducer } = invoiceSlice;

export default reducer;
