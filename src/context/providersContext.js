import useAuth from "hooks/useAuth";
import { useState, useEffect, createContext } from "react";

const initial = {
  saveProviders: null,
};

const ProvidersContext = createContext(initial);

export default function ProvidersContextProvider({ children }) {
  const { user } = useAuth();

  const saveProviders = () => {};

  const value = {
    saveProviders,
  };

  return (
    <ProvidersContext.Provider value={value}>
      {children}
    </ProvidersContext.Provider>
  );
}
