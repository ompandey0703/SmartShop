import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = (() => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : {};

  return {
    cartItems: Array.isArray(cart.cartItems) ? cart.cartItems : [],
    itemsPrice: cart.itemsPrice || 0,
    shippingPrice: cart.shippingPrice || 0,
    taxPrice: cart.taxPrice || 0,
    totalPrice: cart.totalPrice || 0,
    shippingAddress: cart.shippingAddress || {},
    paymentMethod: cart.paymentMethod || "Paypal",
    // NOTE: we need to set the initial state for the cartItems to an empty array
  };
})();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: item.qty } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, qty: item.qty || 1 }];
      }
      updateCart(state); // <-- call after updating cartItems
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
