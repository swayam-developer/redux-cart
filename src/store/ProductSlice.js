import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS_CODE from "../utils/StatusCode";

const initialState = {
  data: [],
  status: STATUS_CODE.IDLE,
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    //   }
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.status = STATUS_CODE.LOADING;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUS_CODE.IDLE;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.status = STATUS_CODE.ERROR;
    });
  },
});

export const { fetchProducts } = ProductSlice.actions;
export default ProductSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
});

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const response = await fetch("https://fakestoreapi.com/products");
//     const data = await response.json();
//     dispatch(fetchProducts(data));
//   };
// }
