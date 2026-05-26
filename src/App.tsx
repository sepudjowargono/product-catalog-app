import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Register from "./components/Register";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
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

  if (!user) {
    return <Register />; // Show registration component if user is not authenticated
  }

  return (
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
  );
}

export default App;
