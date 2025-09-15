import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // {id, title, price, quantity, image}
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item._id === product._id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    decrementQuantity: (state, action) => {
    const item = state.items.find((i) => i._id === action.payload);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
