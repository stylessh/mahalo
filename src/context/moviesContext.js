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

  loading: false,
  setLoading: () => {},
};

export const MoviesContext = createContext(initial);

export default function MoviesContextProvider({ children }) {
  const [trending, setTrending] = useState([]);
  const [trendingPage, setTrendingPage] = useState(1);

  const [customMovies, setCustomMovies] = useState([]);
  const [customMoviesPage, setCustomMoviesPage] = useState(1);

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

    loading,
    setLoading,
  };

  return (
    <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
  );
}
