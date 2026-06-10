import { useState, type SubmitEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/productService";
import type { ProductState } from "../types/Product";

// this component will allow admins to manage the products in the store, include creating new products, updating existing products, and deleting products that are no longer needed

// define an empty product object to use as the initial state for the product form, allowing admins to easily create new products by filling out the form fields
const emptyProduct: ProductState = {
  title: "",
  price: 0,
  category: "",
  description: "",
  image: "",
  rating: {
    rate: 0,
  },
};

// define the ProductManager component, which will allow admins to manage the products in the store, include creating new products, updating, and deleting products that are no longer needed
const ProductManager = () => {
  const [formProduct, setFormProduct] = useState<ProductState>(emptyProduct); // state to hold the current product being created or edited
  const [editingId, setEditingId] = useState<string | null>(null); // state to track whether we are currently editing a product, and if so, which product is being edited

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateProduct(editingId, formProduct);
      } else {
        await createProduct(formProduct);
      }

      setFormProduct(emptyProduct);
      setEditingId(null);
      refetch();
    } catch (error) {
      console.error("Failed to save product", error);
    }
  };

  const handleEdit = (product: ProductState) => {
    setFormProduct(product);
    setEditingId(product.id || null);
  };

  const handleDelete = async (productId?: string) => {
    if (!productId) return;

    try {
      await deleteProduct(productId);
      refetch();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return <p>Failed to load products.</p>;
  }
  return (
    <div className="product-manager">
      <div className="manager-card">
        <h1>Product Manager</h1>

        <form className="manager-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={formProduct.title}
            onChange={(e) =>
              setFormProduct({
                ...formProduct,
                title: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={formProduct.price}
            onChange={(e) =>
              setFormProduct({
                ...formProduct,
                price: Number(e.target.value),
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={formProduct.category}
            onChange={(e) =>
              setFormProduct({
                ...formProduct,
                category: e.target.value,
              })
            }
            required
          />

          <input
            type="text"
            placeholder="Image URL"
            value={formProduct.image}
            onChange={(e) =>
              setFormProduct({
                ...formProduct,
                image: e.target.value,
              })
            }
            required
          />

          <textarea
            placeholder="Description"
            value={formProduct.description}
            onChange={(e) =>
              setFormProduct({
                ...formProduct,
                description: e.target.value,
              })
            }
            required
          />

          <input
            type="number"
            placeholder="Rating"
            value={formProduct.rating.rate}
            onChange={(e) =>
              setFormProduct({
                ...formProduct,
                rating: {
                  ...formProduct.rating,
                  rate: Number(e.target.value),
                },
              })
            }
          />

          <button className="create-update-button" type="submit">
            {editingId ? "Update Product" : "Create Product"}
          </button>
        </form>

        <section className="product-list">
          {products.map((product) => (
            <div key={product.id} className="manager-product-card">
              <h3>{product.title}</h3>
              <p>${product.price.toFixed(2)}</p>
              <p>{product.category}</p>

              <div className="manager-actions">
                <button
                  type="button"
                  className="edit-button"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ProductManager;
