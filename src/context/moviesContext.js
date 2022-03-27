import { useState, useEffect, createContext } from "react";

const initial = {
  trending: [],
  setTrending: () => {},
};

export const MoviesContext = createContext(initial);

export default function MoviesContextProvider({ children }) {
  const [trending, setTrending] = useState([]);

  const value = {
    trending,
    setTrending,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
