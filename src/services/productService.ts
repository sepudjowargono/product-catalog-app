import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { ProductState } from "../types/Product"; // import the ProductState interface from the cartslice file to ensure consistent typing across the application

const productsCollection = collection(db, "products"); // reference to the "products" collection in Firestore

// function to fetch all products from the Firestore database
export const getProducts = async (): Promise<ProductState[]> => {
  const snapshot = await getDocs(productsCollection);

  // map the Firestore documents to the ProductState interface, including the document ID as the "id" property of each product object
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as ProductState[]; // type assertion to ensure the returned data matches the ProductState interface
};

// function to create a new product in the Firestore database
export const createProduct = async (product: ProductState) => {
  return await addDoc(productsCollection, product);
};

// function to update an existing product in the Firestore database
export const updateProduct = async (
  productId: string,
  product: Partial<ProductState>,
) => {
  const productRef = doc(db, "products", productId); // reference to the specific product document in Firestore
  return await updateDoc(productRef, product); // update the product document with the provided data
};

// function to delete a product from the Firestore database
export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, "products", productId); // reference to the specific product document in Firestore
  return await deleteDoc(productRef); // delete the product document from Firestore
};
