import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { clearCart, removeFromCart } from "../cart/cartSlice";
import { auth } from "../firebaseConfig";
import { createOrder } from "../services/orderService";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200x200?text=No+Image";

const ShoppingCart = () => {
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const totalProducts = cart.reduce((total, item) => {
    return total + item.quantity;
  }, 0); // calculate how many total items are in the cart

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0); // calculate full price of cart

  const handleCheckout = async () => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return;
    }

    try {
      await createOrder(currentUser.uid, cart, totalPrice);

      dispatch(clearCart());
      setCheckoutMessage(
        "Thank you for your purchase! Your order has been placed successfully.",
      );
    } catch (error) {
      console.error("Failed to place your order. Please try again.", error);
      setCheckoutMessage("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Shopping Cart</h2>

      {checkoutMessage && cart.length === 0 && (
        <p className="checkout-message">{checkoutMessage}</p>
      )}

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />

                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price.toFixed(2)}</p>

                  <button
                    className="remove-button"
                    onClick={() => item.id && dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <p>
              <strong>Total Products:</strong> {totalProducts}
            </p>

            <p>
              <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
            </p>

            <button className="checkout-button" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
