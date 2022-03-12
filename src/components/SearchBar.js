import { useEffect, useState } from "react";

import SearchResults from "./SearchResults";

import useDebounce from "hooks/useDebounce";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState([]);

  useEffect(() => {
    if (debouncedQuery) {
      //  searching movie by query from input
      fetch(`/api/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results);
        });
    }
  }, [debouncedQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <article className="relative mt-16">
      <input
        type="text"
        placeholder="Search for any movie..."
        value={query}
        onChange={handleChange}
        className="w-[600px] border-2 rounded-full p-4 text-center text-2xl"
      />

      {/* results modal */}
      {results.length > 0 && <SearchResults results={results} />}
    </article>
  );
};

export default SearchBar;
