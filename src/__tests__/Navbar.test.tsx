import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../components/Navbar";
import { store } from "../redux/store";

jest.mock("../firebaseConfig", () => ({
  auth: {},
}));

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

test("renders navbar links", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>,
  );

  expect(screen.getByText(/products/i)).toBeInTheDocument();
  expect(screen.getByText(/order history/i)).toBeInTheDocument();
  expect(screen.getByText(/cart/i)).toBeInTheDocument();
});
