import useAuth from "hooks/useAuth";
import { useState, useEffect, createContext } from "react";

const initial = {
  providers: [],
  setProviders: () => {},

  activatedProviders: [],
  setActivatedProviders: () => {},

  providersIds: [],
  setProvidersIds: () => {},

  custom: false,
  setCustom: () => {},

  defaultProvidersSelected: [],
  setDefaultProvidersSelected: () => {},

  tabIndex: 0,
  setTabIndex: () => {},
};

import data from "providers.json";

export const ProvidersContext = createContext(initial);

export default function ProvidersContextProvider({ children }) {
  const { user } = useAuth();
  const [providers, setProviders] = useState([...data]);
  const [activatedProviders, setActivatedProviders] = useState([]);
  const [providersIds, setProvidersIds] = useState([]);

  const [defaultProvidersSelected, setDefaultProvidersSelected] = useState([]);

  const [tabIndex, setTabIndex] = useState(0);

  // state between all and custom providers
  const [custom, setCustom] = useState(false);

  useEffect(() => {
    if (user) {
      setActivatedProviders([...user.favoritesProviders]);
    } else {
      setActivatedProviders([]);
    }
  }, [user]);

  useEffect(() => {
    // if its all providers, set all default providers selected
    if (tabIndex === 0) {
      const providersIds = data.map((provider) => provider.id);
      // set default providers selected to all providers

      setDefaultProvidersSelected(providersIds);
    }
  }, [user, tabIndex]);

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

    custom,
    setCustom,

    defaultProvidersSelected,
    setDefaultProvidersSelected,

    tabIndex,
    setTabIndex,
  };

  return (
    <ProvidersContext.Provider value={value}>
      {children}
    </ProvidersContext.Provider>
  );
}
