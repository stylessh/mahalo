import axios from "axios";
import useMovies from "hooks/useMovies";
import useProviders from "hooks/useProviders";

const ProviderList = () => {
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

      const { data } = await axios.get("/api/movies/custom", {
        params: {
          providers: [...new Set([...providersIds, id])].join("|"),
          page: customMoviesPage,
        },
      });

      setCustomMovies(data);
      setLoading(false);
    }

    // if it's the first tab, change to custom
    if (tabIndex === 0) {
      setTabIndex(1);
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
