import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ShoppingCart from "./components/ShoppingCart";
import "./App.css";

function App() {
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
