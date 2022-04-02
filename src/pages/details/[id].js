import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Related from "components/Related";

import { movieInfo, relatedMovies } from "services/movies";
import Trailer from "components/Trailer";

import getProviderImage from "utils/getProviderImage";

const MovieDetails = ({ movie, related }) => {
  const router = useRouter();

  const [trailer, setTrailer] = useState("");
  const [openTrailerModal, setOpenTrailerModal] = useState(false);

  const showTrailer = (trailerId) => {
    setTrailer(trailerId);
    setOpenTrailerModal(true);
  };

  return (
    <main className="min-h-screen bg-dark">
      {/* SEO HEAD */}
      <Head>
        <title>Mahalo TV - {movie.title}</title>
      </Head>

      {/* Hero */}

      <section className="relative min-h-screen flex flex-col justify-center items-center">
        {/* background */}

        {/* foreground */}
        <img
          src="/assets/movies-foreground.png"
          alt="Movies Foreground"
          className="absolute inset-0 select-none w-full h-full z-10 object-cover"
        />

        {/* content */}

        <section className="relative w-[90%] md:w-[70%] mx-auto z-20 mt-[90px] bg-dark border-2 border-gray-500 p-8 rounded-lg grid grid-cols-1 xl:grid-cols-[1fr,2fr] gap-x-5">
          {/* close button */}
          <button
            onClick={() => router.back()}
            className="absolute top-5 right-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* media */}
          <article>
            {/* poster image */}
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-[240px] object-contain md:h-[420px]"
            />

            {/* trailer */}

            {movie.trailer && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => showTrailer(movie.trailer.key)}
                  className="text-lg text-gray-300 hover:underline"
                >
                  Watch trailer
                </button>
              </div>
            )}
          </article>

          {/* information  */}
          <article className="mt-12">
            <h1 className="text-xl md:text-2xl xl:text-5xl font-bold text-white">
              {movie.title}
            </h1>

            <ul className="flex mt-10 flex-wrap">
              <li className="flex items-center text-white text-xl mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>

                <p>{movie.release_date}</p>
              </li>

              <li className="flex items-center text-white text-xl mr-4">
                <img
                  src="/assets/imdb-white.png"
                  alt="IMDB"
                  className="w-10 mr-4 object-cover"
                />

                <p>{movie.vote_average.toFixed(1)}</p>
              </li>

              {/* Genres */}
              <ul className="flex items-center space-x-3">
                {movie.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="bg-gray-600 py-1 px-4 rounded-full text-sm text-white"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </ul>

            {/* Overview */}

            <p className="text-gray-500 my-8 text-lg">{movie.overview}</p>

            {/* providers section */}

            {movie.providers && (
              <ul className="space-y-4">
                {/* Subscription services */}
                {movie.providers["flatrate"] && (
                  <li>
                    <h3 className="text-white font-display font-bold text-xl">
                      Subscription Services
                    </h3>

                    <div className="flex space-x-4 mt-2 flex-wrap">
                      {movie.providers["flatrate"]?.map((provider) => (
                        <a
                          key={provider.provider_id}
                          href={movie.providers.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={getProviderImage(
                              provider.provider_id,
                              provider.logo_path
                            )}
                            alt={provider.provider_name}
                            className="w-12 h-12 object-contain"
                          />
                        </a>
                      ))}
                    </div>
                  </li>
                )}

                {/* Rent / Buy */}
                {movie.providers["rent"] && (
                  <li>
                    <h3 className="text-white font-display font-bold text-xl">
                      Rent - Buy
                    </h3>

                    <div className="flex space-x-4 mt-2">
                      {movie.providers["rent"]?.map((provider) => (
                        <a
                          key={provider.provider_id}
                          href={movie.providers.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={getProviderImage(
                              provider.provider_id,
                              provider.logo_path
                            )}
                            alt={provider.provider_name}
                            className="w-10 h-10 object-contain"
                          />
                        </a>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            )}
          </article>
        </section>

        {/* trailer modal  */}
        <Trailer
          open={openTrailerModal}
          setOpen={setOpenTrailerModal}
          trailerId={trailer}
        />
      </section>

      <Related related={related} />
    </main>
  );
};

export async function getServerSideProps({ params }) {
  const movie = await movieInfo(params.id);
  const related = await relatedMovies(params.id);

  return {
    props: {
      movie,
      related,
    },
  };
}

export default MovieDetails;
