import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItem: (state, action) => {
      const item = action.payload;
      console.log(item);
      console.log(state.cartItems);

      // checking item already exist or not in the cartitem array
      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      
      if (isItemExist) {
        // if exist the update the item
        state.cartItems = state.cartItems.map((i) =>
          i.product === isItemExist.product ? item : i
        );
      } else {
        // add new itmes
        state.cartItems = { ...state.cartItems, item };
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export default cartSlice.reducer;
export const { setCartItem } = cartSlice.actions;
