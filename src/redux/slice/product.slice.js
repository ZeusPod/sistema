import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductService from "../../services/product.service";
const initialState = {
  products: [],
  countProducts: 0,
};

export const createProduct = createAsyncThunk(
  "product/create",
  async (data) => {
    const res = await ProductService.createProduct(data);
    return res.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async (data) => {
    const res = await ProductService.updateProduct(data);
    return res.data;
  }
);

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  const res = await ProductService.deleteProduct(id);
  return res.data;
});

export const getProductById = createAsyncThunk(
  "product/getById",
  async (id) => {
    const res = await ProductService.getClientById(id);
    return res.data;
  }
);

export const getPaginatedProduct = createAsyncThunk(
  "product/paginated",
  async ({ column, page, limit, search }) => {
    const res = await ProductService.getPaginatedProduct(
      column,
      page,
      limit,
      search
    );
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      for (let i = 0; i < action.payload.length; i++) {
        const index = state.products.findIndex(
          (product) => product.id === action.payload[i]._id
        );
        state.products[index].quantity =
          state.products[index].quantity - action.payload[i].quantity;
      }
    },
  },
  extraReducers: {
    [createProduct.fulfilled]: (state, action) => {
      state.countProducts = state.countProducts + 1;
      state.products.push(action.payload.data);
    },
    [updateProduct.fulfilled]: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.data.id
      );
      state.products[index] = {
        ...state.products[index],
        ...action.payload.data,
      };
    },
    [deleteProduct.fulfilled]: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.data.id
      );
      state.products.splice(index, 1);
      state.countProducts = state.countProducts - 1;
    },
    [getProductById.fulfilled]: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.data.id
      );
      state.products[index] = {
        ...state.products[index],
        ...action.payload.data.id,
      };
    },
    [getPaginatedProduct.fulfilled]: (state, action) => {
      state.products = action.payload.data;
      state.countProducts = action.payload.countData;
    },
  },
});

const { reducer } = productSlice;
export const { setProducts } = productSlice.actions;

export default reducer;
