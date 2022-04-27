import axios from "axios";
import moviedb from "lib/tmdb";

export default async function handler(request, response) {
  const { q, providers } = request.query;

  const ids = decodeURIComponent(providers);

  //   searching movie by query from input
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_watch_providers=${ids}&watch_region=DK&with_text_query=${q}`
    );

    // obtaining results with images
    const movies = data.results.map(async (movie) => {
      //   getting providers
      const providers = await moviedb.movieWatchProviders({ id: movie.id });

      // remove HBO provider in flatrate
      if (providers.results["DK"]?.flatrate) {
        providers.results["DK"].flatrate = providers.results[
          "DK"
        ].flatrate.filter((provider) => provider.provider_id !== 118);
      }

      return {
        ...movie,
        providers: providers.results["DK"],
      };
    });

    await Promise.all(movies).then((movies) => {
      // return results
      response.status(200).json({ results: movies });
    });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error });
  }
}
