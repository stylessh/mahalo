import Link from "next/link";

const SearchResults = ({ results }) => {
  return (
    <article className="absolute top-full left-0 w-full z-20 mt-6 border rounded-lg max-h-[250px] overflow-y-auto bg-white">
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <Link href={`/details/${result.id}`}>
              <a className="flex items-center p-4 hover:bg-slate-50">
                <img
                  src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  alt={result.title}
                  className="h-24 w-24 object-cover rounded-full"
                />

                <div className="ml-4">
                  <h3 className="text-xl font-bold">{result.title}</h3>
                  <p className="text-sm">{Math.floor(result.popularity)}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default SearchResults;
