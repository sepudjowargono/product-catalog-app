import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { addToCart } from "../cart/cartSlice";
import ShoppingCart from "../components/ShoppingCart";

jest.mock("../firebaseConfig", () => ({
  auth: {
    currentUser: null,
  },
}));

jest.mock("../services/orderService", () => ({
  createOrder: jest.fn(),
}));

const testProduct = {
  id: "test-product-1",
  title: "Test Product",
  price: 25,
  category: "test",
  description: "Test description",
  image: "test-image.jpg",
  rating: {
    rate: 4.5,
  },
};

const TestAddProductButton = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(addToCart(testProduct))}>
      Add Test Product
    </button>
  );
};

test("cart updates when a product is added", async () => {
  const user = userEvent.setup();

  const testStore = configureStore({
    reducer: {
      cart: cartReducer,
    },
  });

  render(
    <Provider store={testStore}>
      <TestAddProductButton />
      <ShoppingCart />
    </Provider>,
  );

  expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /add test product/i }));

  expect(
    screen.getByRole("heading", { name: /test product/i }),
  ).toBeInTheDocument();

  expect(screen.getByText(/quantity:\s*1/i)).toBeInTheDocument();
});
