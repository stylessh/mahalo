import moviedb from "lib/tmdb";

export async function movieInfo(id) {
  try {
    // Get main info
    const res = await moviedb.movieInfo({ id });
    // Get watch providers
    const providers = await moviedb.movieWatchProviders({ id: res.id });
    // Get movie trailers
    const trailers = await moviedb.movieVideos({ id: res.id });

    // remove HBO provider in flatrate
    if (providers.results["DK"].flatrate) {
      providers.results["DK"].flatrate = providers.results[
        "DK"
      ].flatrate.filter((provider) => provider.provider_id !== 118);
    }
    
    return {
      ...res,
      providers: providers.results["DK"] || null,
      trailer:
        trailers.results.find(
          (trailer) =>
            trailer.type === "Trailer" &&
            trailer.site === "YouTube" &&
            trailer.official
        ) || null,
    };
  } catch (error) {
    console.log(error);
  }
}

export async function relatedMovies(id) {
  try {
    const res = await moviedb.movieRecommendations({ id });

    // obtaining results with images
    const movies = res.results.map(async (movie) => {
      //   getting providers
      const providers = await moviedb.movieWatchProviders({ id: movie.id });

      // remove HBO provider in flatrate
      if (providers.results["DK"].flatrate) {
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

    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function trendingMovies(page = 1) {
  // searching popular movies / tv series
  try {
    const res = await moviedb.moviePopular({
      page: page,
    });

    // obtaining results with images
    const movies = res.results.map(async (movie) => {
      //   getting providers
      const providers = await moviedb.movieWatchProviders({ id: movie.id });

      // remove HBO provider in flatrate
      if (providers.results["DK"].flatrate) {
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

    return results;
  } catch (error) {
    console.log(error);
  }
}
