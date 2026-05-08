import { useState } from "react"; // stores the selected category
import { useQuery } from "@tanstack/react-query"; // fetches API data
import { useDispatch } from "react-redux"; // sends actions to Redux

import type { AppDispatch } from "../redux/store"; //gives dispatch a proper TypeScript type
import { addToCart } from "../cart/cartSlice";
import type { ProductState } from "../cart/cartSlice";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/200x200?text=No+Image"; // used if API image is broken

const fetchProducts = async (): Promise<ProductState[]> => {
  // fetch all products and return promise of a product array
  const response = await fetch("https://fakestoreapi.com/products"); // calls FakeStore API to get all products

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  } // if request fails, throw an error

  return response.json(); // convert JSON response into JavaScript data
};

// fetch product categories and return array of category names
const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch("https://fakestoreapi.com/products/categories");

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
};

// fetch products from a selected category and return an array of strings
const fetchProductsByCategory = async (
  category: string,
): Promise<ProductState[]> => {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
  ); //creates a dynamic URL

  if (!response.ok) {
    throw new Error("Failed to fetch category products");
  } // if request fails, throw an error

  return response.json();
};

// component responsible for displaying product catalog
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all"); // stores current category selected in the dropdown
  const dispatch = useDispatch<AppDispatch>();

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  }); // use React Query to fetch the category list from the API

  const {
    data: products,
    isLoading: productsLoading,
    isError: productsError,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
  }); // fetch products to display on the page

  if (productsLoading) {
    return <p>Loading products...</p>;
  } // show this while products are loading

  if (productsError) {
    return <p>Error: {error?.message || "Failed to load products."}</p>;
  } // show this if products fail to load

  return (
    <main>
      <h1>Product Catalog</h1>

      <label htmlFor="category">Filter by category: </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        disabled={categoriesLoading || categoriesError}
      >
        {/* Default option: see all products */}
        <option value="all"> All Products</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <div className="product-section">
        {products?.map((product) => (
          <article key={product.id}>
            <img
              src={product.image}
              alt={product.title}
              width="150"
              onError={(e) => {
                e.currentTarget.src = PLACEHOLDER_IMAGE;
              }}
            />

            <h2>{product.title}</h2>

            <p>
              <strong>Price:</strong> ${product.price.toFixed(2)}
            </p>

            <p>
              <strong>Category:</strong> {product.category}
            </p>

            <p>
              <strong>Description:</strong> {product.description}
            </p>

            <p>
              <strong>Rating:</strong> {product.rating.rate} / 5
            </p>

            <button
              className="add-cart"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </main>
  );
};

export default Home;
