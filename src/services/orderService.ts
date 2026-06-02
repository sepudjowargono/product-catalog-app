import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { CartItem } from "../cart/cartSlice"; // import the CartItem interface from the cartslice file to ensure consistent typing across the application

// function to create a new order in the Firestore database, which takes the user ID and an array of cart items as parameters
export const createOrder = async (
  userId: string,
  items: CartItem[],
  totalPrice: number,
) => {
  return await addDoc(collection(db, "orders"), {
    userId, // store the user ID in the order document to associate the order with a specific user
    items, // store the array of cart items in the order document to keep track of what products were ordered
    totalPrice, // store the total price of the order in the order document for easy reference
    createdAt: serverTimestamp(), // store the timestamp of when the order was created using Firestore's serverTimestamp function to ensure accurate and consistent timestamps across all orders
  });
};

// function to fetch all orders for a specific user from the Firestore database, which takes the user ID as a parameter
export const getUserOrders = async (userId: string) => {
  const orderQuery = query(
    collection(db, "orders"), // reference to the "orders" collection in Firestore
    where("userId", "==", userId), // query to filter orders by the specified user ID
  );

  const snapshot = await getDocs(orderQuery); // execute the query to fetch the matching orders from Firestore

  // map the Firestore documents to an array of order objects, including the document ID as the "id" property of each order object
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(), // spread the data from the Firestore document into the order object
  }));
};
