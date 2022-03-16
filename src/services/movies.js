import moviedb from "lib/tmdb";

export async function movieInfo(id) {
  try {
    // Get main info
    const res = await moviedb.movieInfo({ id });
    // Get watch providers
    const providers = await moviedb.movieWatchProviders({ id: res.id });

    return {
      ...res,
      providers: providers.results["DK"] || null,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function trendingMovies() {
  // searching popular movies / tv series
  try {
    const res = await moviedb.moviePopular();

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

    return results;
  } catch (error) {
    console.log(error);
  }
}
