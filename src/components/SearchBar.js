import React from "react";

const SearchBar = () => {
  return (
    <article className="mt-16">
      <input
        type="text"
        placeholder="Search for any movie..."
        className="w-[600px] border-2 rounded-full p-4 text-center text-2xl"
      />
    </article>
  );
};

export default SearchBar;
