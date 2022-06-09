import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import InvoceService from "../../services/invoice.service";
import { setProducts } from "./product.slice";

const initialState = {
  id: "",
  client: {
    id: "",
    name: "",
    nationalId: "",
    address: "",
    phone: "",
  },
  user: "",
  data: [],
  amount: 0,
  pay: 0,
  change: 0,
};

export const createInvoice = createAsyncThunk(
  "invoice/create",
  async (data, thunkAPI) => {
    try {
      const res = await InvoceService.createInvoice(data);
      thunkAPI.dispatch(setProducts(res.data.data.products));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateInvoice = createAsyncThunk(
  "invoice/update",
  async (data, thunkAPI) => {
    try {
      const res = await InvoceService.updateInvoiceById(
        data.id,
        data.products,
        data.amount,
        data.status
      );
      thunkAPI.dispatch(setProducts(res.data.data));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

const sellSlice = createSlice({
  name: "sell",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload;
    },
    addProduct: (state, action) => {
      const find = state.data.find(
        (product) => product._id === action.payload.id
      );
      if (find === undefined && action.payload.quantity > 0) {
        const { id, name, price, quantity } = action.payload;
        state.data.push({
          _id: id,
          name: name,
          price: price,
          stock: quantity,
          quantity: 1,
          total: price,
        });
        state.amount = state.amount + price;
        state.pay = state.amount;
        state.change = state.pay - state.amount;
      }
    },
    updateProducts: (state, action) => {
      var products = [];
      var amount = 0;
      for (let i = 0; i < action.payload.data.length; i++) {
        products.push({
          _id: action.payload.data[i]._id.id,
          name: action.payload.data[i].name,
          price: action.payload.data[i].price,
          quantity: action.payload.data[i].quantity,
          total: action.payload.data[i].total,
          stock: action.payload.data[i]._id.quantity,
        });
        amount = amount + action.payload.data[i].total;
      }
      state.id = action.payload.id;
      state.data = products;
      state.amount = amount;
      state.pay = amount;
    },
    updateProduct: (state, action) => {
      state.data[action.payload.index].quantity = action.payload.quantity;
      state.data[action.payload.index].total =
        action.payload.price * action.payload.quantity;

      if (action.payload.type == "add") {
        state.amount = state.amount + action.payload.price;
      } else {
        state.amount = state.amount - action.payload.price;
      }
      state.pay = state.amount;
      state.change = state.pay - state.amount;
    },
    deleteProduct: (state, action) => {
      state.amount = state.amount - state.data[action.payload.index].total;
      state.data.splice(action.payload.index, 1);
      state.pay = state.amount;
      state.change = state.pay - state.amount;
      if (state.data.length == 0) {
        state.id = "";
      }
    },
    setAmount: (state, action) => {
      state.amount = action.payload;
    },
    setPay: (state, action) => {
      state.pay = action.payload;
      state.change = state.pay - state.amount;
    },
    setChange: (state, action) => {
      state.change = action.payload;
    },
  },
  extraReducers: {
    [createInvoice.fulfilled]: (state, action) => {
      state.client = initialState.client;
      state.user = initialState.user;
      state.data = initialState.data;
      state.amount = initialState.amount;
      state.pay = initialState.pay;
      state.change = initialState.change;
    },
    [updateInvoice.fulfilled]: (state, action) => {
      state.client = initialState.client;
      state.user = initialState.user;
      state.data = initialState.data;
      state.amount = initialState.amount;
      state.pay = initialState.pay;
      state.change = initialState.change;
      state.id = initialState.id;
    },
  },
});

export const {
  setClient,
  addProduct,
  updateProduct,
  updateProducts,
  deleteProduct,
  setAmount,
  setPay,
  setChange,
} = sellSlice.actions;

const { reducer } = sellSlice;
export default reducer;
