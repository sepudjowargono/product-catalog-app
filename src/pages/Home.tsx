import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store";
import { addToCart } from "../cart/cartSlice";
import type { ProductState } from "../types/Product";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200x200?text=No+Image";

// Home component to display the list of products
const Home = () => {
  const [products, setProducts] = useState<ProductState[]>([]); // state to hold the list of products
  const [selectedCategory, setSelectedCategory] = useState("all"); // state to track the delected category for filtering products
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

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  ); // get unique categories from the products for filtering

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory); // filter products based on the selected category

  if (loading) {
    return <p className="loading">Loading products...</p>; // display a loading message while products are being fetched
  }

  return (
    <div className="page-header">
      <h1>Products Catalog</h1>

      <div className="category-filter">
        <label htmlFor="category">Filter by Category:</label>

        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Products</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category
                .split(" ") // split category name into words
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize the first letter of each word
                .join(" ")}{" "}
            </option>
          ))}
        </select>
      </div>

      <div className="product-grid">
        {filteredProducts.map(
          (
            product, // map over the filtered products to display them in a grid
          ) => (
            <div className="product-card" key={product.id}>
              <img
                className="product-image"
                src={product.image}
                alt={product.title}
                onError={(e) => {
                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
              />

              <div className="product-info">
                <h2>{product.title}</h2>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>
                <p className="product-rating">
                  Rating: {product.rating.rate} / 5
                </p>

                <button
                  className="button-addcart"
                  onClick={() => dispatch(addToCart(product))}
                  disabled={!product.id} // disable the button if the product ID is missing
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Home;
