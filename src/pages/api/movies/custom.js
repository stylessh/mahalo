import axios from "axios";
import moviedb from "lib/tmdb";

export default async function handler(request, response) {
  try {
    const { providers, page } = request.query;

    const ids = decodeURIComponent(providers);

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_watch_providers=${ids}&watch_region=DK&page=${page}`
    );

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
        providers: providers.results["DK"] || null,
      };
    });

    const results = await Promise.all(movies);

    response.json(results);
  } catch (error) {
    console.log(error);
  }
}
