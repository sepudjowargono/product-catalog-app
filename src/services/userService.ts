import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { UserProfile } from "../types/UserProfile";

// service function to create user profile in Firestore
export const createUserProfile = async (userProfile: UserProfile) => {
  return await setDoc(doc(db, "users", userProfile.uid), userProfile);
};

// service function to get user profile from Firestore
export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid); // reference to the user's document in Firestore
  const snapshot = await getDoc(userRef); // get the document snapshot

  if (!snapshot.exists()) {
    return null; // if the document doesn't exist, return null
  }

  return snapshot.data() as UserProfile; // return the document data as a UserPRofile object
};

export const updateUserProfile = async (
  uid: string,
  updatedData: Partial<UserProfile>,
) => {
  const userRef = doc(db, "users", uid);
  return await updateDoc(userRef, updatedData); // update the document with the provided data
};

export const deleteUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  return await deleteDoc(userRef); // delete the user's document from Firestore
};
