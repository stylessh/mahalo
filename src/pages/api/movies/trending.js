import moviedb from "lib/tmdb";

export default async function handler(request, response) {
  const { page } = request.query;

   // searching popular movies / tv series
   try {
    const res = await moviedb.moviePopular({
      page: page || 1
    });

    // obtaining results with images
    const movies = res.results.map(async (movie) => {
      //   getting providers
      const providers = await moviedb.movieWatchProviders({ id: movie.id });

      return {
        ...movie,
        providers: providers.results["DK"] || null,
      };
    });

    const results = await Promise.all(movies);

    return response.json(results);
  } catch (error) {
    console.log(error);
  }
}
