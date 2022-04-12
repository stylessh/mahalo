import axios from "axios";
import useMovies from "hooks/useMovies";
import useProviders from "hooks/useProviders";

const ProviderList = () => {
  const { setCustomMovies, customMoviesPage, setCustomMoviesPage, setLoading } =
    useMovies();
  const {
    providers,
    custom,
    defaultProvidersSelected,
    setDefaultProvidersSelected,
  } = useProviders();

  const searchByProvider = async (id) => {
    // if already selected, remove selected

    if (defaultProvidersSelected.includes(id)) {
      setDefaultProvidersSelected(
        defaultProvidersSelected.filter((provider) => provider !== id)
      );
    } else {
      setDefaultProvidersSelected([...defaultProvidersSelected, id]);
    }

    setLoading(true);
    setCustomMoviesPage(1);

    const { data } = await axios.get("/api/movies/custom", {
      params: {
        providers: [...defaultProvidersSelected, id].join("|"),
        page: customMoviesPage,
      },
    });

    setCustomMovies(data);
    setLoading(false);
  };

  return (
    <article className="overflow-x-auto">
      <ul className="w-max mx-auto overflow-x-auto flex items-center space-x-4">
        {providers.map((provider, index) => {
          const isSelected = defaultProvidersSelected.includes(provider.id);

          return (
            <button
              key={index}
              className="w-[200px] outline-none"
              onClick={() => searchByProvider(provider.id)}
            >
              <img
                src={`/assets/providers/${provider.badge}`}
                alt={provider.name}
                className={`object-cover w-full h-full rounded-md select-none ${
                  custom ? `${isSelected ? "" : "grayscale"}` : ""
                }`}
              />
            </button>
          );
        })}
      </ul>
    </article>
  );
};

export default ProviderList;
