import { MovieDb } from "moviedb-promise";

const moviedb = new MovieDb(process.env.TMDB_API_KEY);

export default async function handler(request, response) {
  const { query } = request;

  //   searching movie by query from input
  try {
    const res = await moviedb.searchMovie({ query: query.q });

    // obtaining results with images
    res.results.forEach(async (movie) => {
      const movieDetails = await moviedb.movieInfo({ id: movie.id });
      movie.poster_path = movieDetails.poster_path;
    });

    // return results
    response.status(200).json({ results: res.results });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error });
  }
}
