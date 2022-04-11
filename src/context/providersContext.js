import useAuth from "hooks/useAuth";
import { useState, useEffect, createContext } from "react";

const initial = {
  providers: [],
  setProviders: () => {},

  activatedProviders: [],
  setActivatedProviders: () => {},

  providersIds: [],
  setProvidersIds: () => {},
};

import data from "providers.json";

export const ProvidersContext = createContext(initial);

export default function ProvidersContextProvider({ children }) {
  const { user } = useAuth();
  const [providers, setProviders] = useState([...data]);
  const [activatedProviders, setActivatedProviders] = useState([]);
  const [providersIds, setProvidersIds] = useState([]);

  useEffect(() => {
    if (user) {
      setActivatedProviders([...user.favoritesProviders]);
    } else {
      setActivatedProviders([]);
    }
  }, [user]);

  useEffect(() => {
    if (activatedProviders.length > 0) {
      setProvidersIds(
        activatedProviders.map((provider) => provider.provider_id)
      );
    }
  }, [activatedProviders]);

  const value = {
    providers,
    setProviders,

    activatedProviders,
    setActivatedProviders,

    providersIds,
    setProvidersIds,
  };

  return (
    <ProvidersContext.Provider value={value}>
      {children}
    </ProvidersContext.Provider>
  );
}
