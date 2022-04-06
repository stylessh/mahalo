import { useState, useEffect, createContext } from "react";

const initial = {
  trending: [],
  setTrending: null,

  trendingPage: 1,
  setTrendingPage: null,
};

export const MoviesContext = createContext(initial);

export default function MoviesContextProvider({ children }) {
  const [trending, setTrending] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);

  const value = {
    trending,
    setTrending,

    trendingPage,
    setTrendingPage,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
