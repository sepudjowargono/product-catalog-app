import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../redux/store";
import Logout from "./Logout";

const Navbar = () => {
  const cart = useSelector((state: RootState) => state.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0); //counts all quantities in the cart

  return (
    <nav className="navbar">
      <div className="navbar-logo">FakeStore</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/orders">Order History</Link>
        <Link to="/products/manage">Manage Products</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </div>
      <Logout />
    </nav>
  );
};

export default Navbar;
