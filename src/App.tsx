import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      {!user ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <>
          <Navbar />

          <main className="app-container">
            <div id="products" className="products-section">
              <Home />
            </div>

            <div id="cart" className="cart-section">
              <ShoppingCart />
            </div>
          </main>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
