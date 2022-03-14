import Image from "next/image";
import Link from "next/link";

const AllServices = ({ trending }) => {
  return (
    <section className="my-12">
      <ul className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-8">
        {trending.map((item) => (
          <li className="relative h-full" key={item.id}>
            <Link href={`/details/${item.id}`}>
              <a
                className={`block w-full h-[350px] bg-slate-100 rounded-md bg-cover`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
                }}
              >
                {/* overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#111111be]"></div>

                {/* card info */}
                <article className="absolute flex justify-between items-center bottom-0 left-0 right-0 z-20 py-4 md:py-2 px-4">
                  <p className="flex items-center font-semibold text-white">
                    <img
                      src="/assets/imdb-white.png"
                      alt="IMDB"
                      className="w-10 mr-2 object-cover"
                    />
                    {item.vote_average}
                  </p>

                  {item.providers && (
                    <ul>
                      {item.providers["flatrate"]?.map((provider) => (
                        <img
                          key={provider.provider_id}
                          src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
                          alt={provider.provider_name}
                          className="w-10 h-10 md:w-8 md:h-8 object-cover rounded-full"
                        />
                      ))}
                    </ul>
                  )}
                </article>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AllServices;
