import { useEffect, useState, useRef } from "react";

import SearchResults from "./SearchResults";

import useDebounce from "hooks/useDebounce";
import useOnClickOutside from "hooks/useOnClickOutside";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  const [results, setResults] = useState([]);

  const modalRef = useRef(null);

  // handle modal view
  const [open, setOpen] = useState(false);
  useOnClickOutside(modalRef, () => setOpen(false));

  useEffect(() => {
    if (debouncedQuery) {
      //  searching movie by query from input
      fetch(`/api/search?q=${debouncedQuery}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results);
          setOpen(true);
        });
    }
  }, [debouncedQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <article className="relative mt-16 z-20">
      <input
        type="text"
        placeholder="Search for any movie..."
        value={query}
        onChange={handleChange}
        onFocus={() => {
          if (results.length > 0) {
            setOpen(true);
          }
        }}
        className="w-[600px] border-2 rounded-full p-4 text-center text-2xl bg-dark border-light outline-none text-white"
      />

      {/* results modal */}
      {results.length > 0 && open ? (
        <SearchResults results={results} ref={modalRef} />
      ) : null}
    </article>
  );
};

export default SearchBar;
