import { useContext } from "react";
import { MoviesContext } from "context/moviesContext";

// create a react hook that uses the movie context
export default function useMovies() {
  return useContext(MoviesContext);
}
