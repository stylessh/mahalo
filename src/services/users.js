import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export const getUserByEmail = async (email) => {
  try {
    const docRef = collection(db, "users");
    const q = query(docRef, where("email", "==", email));
    const docSnap = await getDocs(q);

    if (!docSnap.empty) return docSnap.docs[0].data();

    return null;
  } catch (error) {
    console.error(error);
  }
};

export const getUserData = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userInfo = docSnap.data();

      return userInfo;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createUser = async (id, credentials) => {
  try {
    const docRef = doc(collection(db, "users"), id);

    // check if user exists
    const user = await getUserByEmail(credentials.email);

    if (user) {
      return {
        error: "The email is already registered.",
      };
    }

    await setDoc(docRef, {
      id,
      favoritesProviders: [],
      ...credentials,
    });
  } catch (error) {
    console.error(error);
  }
};

// update user's providers list
export const updateUserProviders = async (id, providers) => {
  try {
    const docRef = doc(db, "users", id);
    await setDoc(docRef, { favoritesProviders: providers }, { merge: true });
  } catch (error) {
    console.error(error);
  }
};
