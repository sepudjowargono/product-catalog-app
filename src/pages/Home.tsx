import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addToCart } from "../cart/cartSlice";
import type { ProductState } from "../types/Product";

// Home component to display the list of products
const Home = () => {
  const [products, setProducts] = useState<ProductState[]>([]); // state to hold the list of products
  const [loading, setLoading] = useState(true); // state a track of loading status
  const dispatch = useDispatch<AppDispatch>(); // get the dispatch function from Redux

  // useEffect to fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await getProducts(); // fetch products from the service
        setProducts(productData); // update the products state with the fetched data
      } catch (error) {
        console.error("Failed to fetch products:", error); // log any errors that occur during fetching
      } finally {
        setLoading(false); // set loading to false after fetching is complete
      }
    };

    fetchProducts(); // call the fetchProducts function
  }, []); // empty dependency array to run only once on mount

  if (loading) {
    return <p className="loading">Loading products...</p>; // display a loading message while products are being fetched
  }

  return (
    <div className="product-list">
      <h1>Products Catalog</h1>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />

            <h2>{product.title}</h2>
            <p>${product.price.toFixed(2)}</p>
            <p>{product.category}</p>
            <p>{product.description}</p>
            <p>Rating: {product.rating.rate} / 5</p>

            <button
              className="button-addcart"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
