// create shopping cart logic
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends ProductState {
  quantity: number;
}

const loadCartFromSessionStorage = (): CartItem[] => {
  try {
    const savedCart = sessionStorage.getItem("cart");

    return savedCart ? JSON.parse(savedCart) : []; // return and convert saved cart data (if any) from string back to array
  } catch (error) {
    console.error("Error: Failed to load cart", error);

    return [];
  }
};

const saveCartToSessionStorage = (cart: CartItem[]) => {
  try {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error: Failed to save card", error);
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

    removeFromCart: (state, action: PayloadAction<number>) => {
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
