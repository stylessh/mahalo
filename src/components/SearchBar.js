import { useEffect, useState } from "react";
import axios from "axios";

import useDebounce from "hooks/useDebounce";
import useMovies from "hooks/useMovies";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 200);

  const { setTrending } = useMovies();

  useEffect(() => {
    if (debouncedQuery) {
      //  searching movie by query from input
      axios.get(`/api/search?q=${debouncedQuery}`).then(({ data }) => {
        setTrending(data.results);
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
