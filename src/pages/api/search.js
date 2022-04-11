import moviedb from "lib/tmdb";

export default async function handler(request, response) {
  const { query } = request;

  //   searching movie by query from input
  try {
    const res = await moviedb.searchMovie({ query: query.q });

    // obtaining results with images
    const movies = res.results.map(async (movie) => {
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
