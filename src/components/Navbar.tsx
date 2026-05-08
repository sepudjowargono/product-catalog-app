import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0); //counts all quantities in the cart

  return (
    <nav className="navbar">
      <div className="navbar-logo">FakeStore</div>

      <div className="navbar-links">
        <a href="#products">Products</a>
        <a href="#cart">Cart ({totalItems})</a>
      </div>
    </nav>
  );
};

export default Navbar;
