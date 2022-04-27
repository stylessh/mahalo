import { useEffect, useState } from "react";
import axios from "axios";

import useDebounce from "hooks/useDebounce";
import useMovies from "hooks/useMovies";
import useProviders from "hooks/useProviders";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { tabIndex, providersIds } = useProviders();

  const { setTrending, setCustomMovies, customMoviesPage } = useMovies();

  useEffect(() => {
    if (debouncedQuery) {
      if (tabIndex === 0) {
        //  searching movie by query from input
        axios.get(`/api/search?q=${debouncedQuery}`).then(({ data }) => {
          setTrending(data.results);
        });
      }

      if (tabIndex === 1) {
        axios
          .get(`/api/searchByProvider`, {
            params: {
              q: debouncedQuery,
              providers: providersIds.join("|"),
            },
          })
          .then(({ data }) => {
            setCustomMovies(data.results);
          });
      }

      setHasSearched(true);

      return;
    }

    // get trending movies
    if (!debouncedQuery && hasSearched) {
      axios.get("/api/movies/trending").then(({ data }) => {
        setTrending(data);
      });
    }

    // get custom movies
    if (!debouncedQuery && !hasSearched) {
      axios
        .get("/api/movies/custom", {
          params: {
            providers: providersIds.join("|"),
            page: customMoviesPage,
          },
        })
        .then(({ data }) => {
          setCustomMovies(data);
        });
    }
  }, [debouncedQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <article className="relative mt-8 z-20 w-[90%] mx-auto md:w-[600px]">
      <input
        type="text"
        placeholder="Search for any movie..."
        value={query}
        onChange={handleChange}
        className="block w-full border-2 rounded-full p-4 text-center text-2xl bg-dark border-light outline-none text-white"
      />
    </article>
  );
};

export default SearchBar;
