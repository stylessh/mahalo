import { forwardRef } from "react";

import Link from "next/link";

const SearchResults = ({ results }, ref) => {
  return (
    <article
      ref={ref}
      className="absolute top-full left-0 w-full mt-6 rounded-lg max-h-[250px] overflow-y-auto bg-dark shadow-md results"
    >
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <Link href={`/details/${result.id}`}>
              <a className="flex items-center p-4 text-white">
                {result.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                    alt={result.title}
                    className="h-24 w-24 object-cover rounded-full"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                  </svg>
                )}

                <div className="ml-6">
                  <h3 className="text-xl font-bold">{result.title}</h3>
                  <p className="flex items-center font-semibold">
                    <img
                      src="/assets/imdb-white.png"
                      alt="IMDB"
                      className="w-10 mr-2 object-cover"
                    />
                    {result.vote_average}
                  </p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default forwardRef(SearchResults);
