import { useState, useEffect, createContext } from "react";

const initial = {
  trending: [],
  setTrending: null,

  trendingPage: 1,
  setTrendingPage: null,

  customMovies: [],
  setCustomMovies: null,

  customMoviesPage: 1,
  setCustomMoviesPage: null,

  trendingScrollPos: 0,
  setTrendingScrollPos: () => {},

  isSearching: false,
  setIsSearching: () => {},

  loading: false,
  setLoading: () => {},
};

export const MoviesContext = createContext(initial);

export default function MoviesContextProvider({ children }) {
  const [trending, setTrending] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);

  const [customMovies, setCustomMovies] = useState([]);
  const [customMoviesPage, setCustomMoviesPage] = useState(1);

  const [trendingScrollPos, setTrendingScrollPos] = useState(0);

  const [isSearching, setIsSearching] = useState(false);

  const [loading, setLoading] = useState(false);

  const value = {
    trending,
    setTrending,

    trendingPage,
    setTrendingPage,

    customMovies,
    setCustomMovies,

    customMoviesPage,
    setCustomMoviesPage,

    trendingScrollPos,
    setTrendingScrollPos,

    isSearching,
    setIsSearching,

    loading,
    setLoading,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
