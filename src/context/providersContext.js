import useAuth from "hooks/useAuth";
import { useState, useEffect, createContext } from "react";

const initial = {
  saveProviders: () => {},

  providers: [],
  setProviders: () => {},

  activatedProviders: [],
  setActivatedProviders: () => {},
};

import data from "providers.json";

export const ProvidersContext = createContext(initial);

export default function ProvidersContextProvider({ children }) {
  const { user } = useAuth();
  const [providers, setProviders] = useState([...data]);
  const [activatedProviders, setActivatedProviders] = useState([...data]);

  const saveProviders = () => {};

  const value = {
    saveProviders,

    providers,
    setProviders,

    activatedProviders,
    setActivatedProviders,
  };

  return (
    <ProvidersContext.Provider value={value}>
      {children}
    </ProvidersContext.Provider>
  );
}
