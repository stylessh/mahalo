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

  const [firstRender, setFirstRender] = useState(true);

  const [defaultProvidersSelected, setDefaultProvidersSelected] = useState([
    ...data.map((provider) => provider.id),
  ]);

  const [tabIndex, setTabIndex] = useState(0);

  // state between all and custom providers
  const [custom, setCustom] = useState(false);

  useEffect(() => {
    if (user) {
      setActivatedProviders([...user.favoritesProviders]);

      const activatedProvidersId = user.favoritesProviders.map(
        (provider) => provider.provider_id
      );

      setProvidersIds([
        ...new Set([...defaultProvidersSelected, ...activatedProvidersId]),
      ]);
    } else {
      setActivatedProviders([]);
    }
  }, [user]);

  useEffect(() => {
    // if its all providers, set all default providers selected
    if (tabIndex === 0) {
      const providersIds = data.map((provider) => provider.id);
      // set default providers selected to all providers

      const activatedProvidersId = user.favoritesProviders.map(
        (provider) => provider.provider_id
      );

      setDefaultProvidersSelected([
        ...new Set([...providersIds, ...activatedProvidersId]),
      ]);
    }
  }, [user, tabIndex]);

  useEffect(() => {
    if (!firstRender) {
      const activatedProvidersId = activatedProviders.map(
        (provider) => provider.provider_id
      );

      setProvidersIds([...new Set([...providersIds, ...activatedProvidersId])]);
    }

    setFirstRender(false);
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
