// create shopping cart logic
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductState } from "../types/Product"; // import the PRoductState interface from the types folder to ensure consistent typing across the application

export interface CartItem extends ProductState {
  quantity: number;
}

// helper function to load cart data from session storage, with error handling to ensure the application can gracefully handle any issues with accessing session storage
const loadCartFromSessionStorage = (): CartItem[] => {
  try {
    const savedCart = sessionStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : []; // return and convert saved cart data (if any) from string back to array
  } catch (error) {
    console.error("Error: Failed to load cart", error);

    return [];
  }
};

// helper function to save cart data to session storage, with error handling to ensure the application can gracefully handle any issues with accessing session storage
const saveCartToSessionStorage = (cart: CartItem[]) => {
  try {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error: Failed to save cart. Please try again.", error);
  }
};

const initialState: CartItem[] = loadCartFromSessionStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductState>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }

      saveCartToSessionStorage(state);
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.find((item) => item.id === action.payload);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          const updatedCart = state.filter(
            (item) => item.id !== action.payload,
          );

          saveCartToSessionStorage(updatedCart);

          return updatedCart;
        }
      }

      saveCartToSessionStorage(state);
    },

    clearCart: () => {
      try {
        sessionStorage.removeItem("cart");
      } catch (error) {
        console.error("Error: Failed to clear cart", error);
      }

      return [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
