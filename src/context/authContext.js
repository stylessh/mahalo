import { useState, useEffect, createContext } from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "lib/firebase";

import { getUserData, createUser } from "../services/users";

const initial = {
  user: null,
  setUser: null,

  login: null,
  signUp: null,
  logout: null,

  refreshUser: null,

  // signup modal
  openSignUp: null,
  setOpenSignUp: null,

  // signin modal
  openSignIn: null,
  setOpenSignIn: null,
};

// create context and export it
export const AuthContext = createContext(initial);

// create a context provider
export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openSignUp, setOpenSignUp] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  // create useEffect that will listen to auth state changes
  useEffect(() => {
    setLoading(true);
    const unsub = onAuthStateChanged(auth, async (res) => {
      if (res) {
        await refreshUser(res.uid);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  const refreshUser = async (id) => {
    const data = await getUserData(id);
    setUser({ ...data, id });
  };

  // create login function that login with firebase email and password
  const login = async (credentials) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      return null;
    } catch (error) {
      return "Usuario no encontrado, verifica tus credenciales.";
    }
  };

  const signUp = async (credentials) => {
    const res = await createUserWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );

    const error = await createUser(res.user.uid, {
      email: credentials.email,
      name: credentials.name,
    });

    if (error) {
      return error;
    }
  };

  // create logout that will sign out from firebase
  const logout = async () => {
    await signOut(auth);

    setUser(null);
  };

  const value = {
    user,

    login,
    signUp,
    logout,

    refreshUser,

    // signup modal
    openSignUp,
    setOpenSignUp,

    // signin modal
    openSignIn,
    setOpenSignIn,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
