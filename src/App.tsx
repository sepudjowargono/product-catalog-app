import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "./firebaseConfig";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ProductManager from "./pages/ProductManager";
import OrderHistory from "./pages/OrderHistory";

import Navbar from "./components/Navbar";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <p>Loading...</p>;
  }

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      ) : (
        <>
          <Navbar />

          <Routes>
            <Route
              path="/"
              element={
                <main className="app-container">
                  <div id="products" className="products-section">
                    <Home />
                  </div>

                  <div id="cart" className="cart-section">
                    <ShoppingCart />
                  </div>
                </main>
              }
            />

            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/products/manage" element={<ProductManager />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
