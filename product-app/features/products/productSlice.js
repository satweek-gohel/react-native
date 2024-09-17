import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action) {
      state.products = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    updateProduct(state, action) {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(product => product._id === updatedProduct._id);
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    deleteProduct(state, action) {
      const productId = action.payload;
      state.products = state.products.filter(product => product._id !== productId);
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, addProduct, updateProduct, deleteProduct } = productSlice.actions;

export default productSlice.reducer;
