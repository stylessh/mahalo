import axios from "axios";
import useAuth from "hooks/useAuth";
import useMovies from "hooks/useMovies";
import useProviders from "hooks/useProviders";
import { updateUserProviders } from "services/users";

import allProviders from "data.json";

const ProviderList = () => {
  const { user, refreshUser } = useAuth();

  const { setCustomMovies, customMoviesPage, setCustomMoviesPage, setLoading } =
    useMovies();

  const {
    providers,
    defaultProvidersSelected,
    setDefaultProvidersSelected,
    providersIds,
    setProvidersIds,
    tabIndex,
    setTabIndex,
  } = useProviders();

  const searchByProvider = async (id) => {
    // if already selected, remove selected
    if (defaultProvidersSelected.includes(id)) {
      setDefaultProvidersSelected(
        defaultProvidersSelected.filter((provider) => provider !== id)
      );

      setProvidersIds([
        ...new Set(providersIds.filter((provider) => provider !== id)),
      ]);

      setLoading(true);
      setCustomMoviesPage(1);

      const providers = user.favoritesProviders.filter(
        (provider) => provider.provider_id !== id
      );

      // if it's the first tab, change to custom
      if (tabIndex === 0) {
        setTabIndex(1);
      }

      // remove provider to user custom list
      await updateUserProviders(user.id, providers);
      await refreshUser(user.id);

      const { data } = await axios.get("/api/movies/custom", {
        params: {
          providers: [
            ...new Set(providersIds.filter((provider) => provider !== id)),
          ].join("|"),
          page: customMoviesPage,
        },
      });

      setCustomMovies(data);
      setLoading(false);
    } else {
      setDefaultProvidersSelected([...defaultProvidersSelected, id]);
      setProvidersIds([...new Set([...providersIds, id])]);

      setLoading(true);
      setCustomMoviesPage(1);

      const provider = allProviders.find(
        (provider) => provider.provider_id === id
      );

      // add provider to user custom list
      await updateUserProviders(user.id, [
        ...user.favoritesProviders,
        provider,
      ]);
      await refreshUser(user.id);

      const { data } = await axios.get("/api/movies/custom", {
        params: {
          providers: [...new Set([...providersIds, id])].join("|"),
          page: customMoviesPage,
        },
      });

      setCustomMovies(data);
      setLoading(false);
    }
  };

  return (
    <article className="overflow-x-auto">
      <ul className="w-max mx-auto flex items-center space-x-4">
        {providers.map((provider, index) => {
          const isSelected = defaultProvidersSelected.includes(provider.id);

          return (
            <button
              key={index}
              className="w-[200px] outline-none"
              onClick={() => searchByProvider(provider.id)}
            >
              <img
                src={`/assets/providers/${
                  isSelected ? provider.badge : provider.unselectedBadge
                }`}
                alt={provider.name}
                className={`object-cover w-full h-full rounded-md select-none`}
              />
            </button>
          );
        })}
      </ul>
    </article>
  );
};

export default ProviderList;
