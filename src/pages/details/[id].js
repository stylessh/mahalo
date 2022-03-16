import Head from "next/head";

import { movieInfo } from "services/movies";

const MovieDetails = ({ movie }) => {
  return (
    <main className="min-h-screen overflow-x-hidden bg-dark">
      {/* SEO HEAD */}
      <Head>
        <title>Mahalo TV - {movie.title}</title>
      </Head>

      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 w-full h-screen">
        {/* background */}

        <article>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="select-none w-full h-full object-cover"
          />
        </article>

        {/* content */}

        <article className="p-8">
          <header className="mt-12">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              {movie.title}
            </h1>

            <ul className="flex space-x-6 mt-10">
              <li className="flex items-center text-white text-xl">
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

              <li className="flex items-center text-white text-xl">
                <img
                  src="/assets/imdb-white.png"
                  alt="IMDB"
                  className="w-10 mr-4 object-cover"
                />

                <p>{movie.vote_average}</p>
              </li>
            </ul>

            {/* Genres */}
            {/* <ul className="flex mt-6 space-x-4">
              {movie.genres.map((genre) => (
                <li key={genre.id} className="list-disc list-inside">{genre.name}</li>
              ))}
            </ul> */}

            {/* Overview */}

            <p className="text-gray-500 my-8 text-lg">{movie.overview}</p>
          </header>
        </article>
      </section>
    </main>
  );
};

export async function getServerSideProps({ params }) {
  const movie = await movieInfo(params.id);

  return {
    props: {
      movie,
    },
  };
}

export default MovieDetails;
