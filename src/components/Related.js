import Link from "next/link";
import getProviderImage from "utils/getProviderImage";

const Related = ({ related }) => {
  return (
    <section className="relative w-[90%] mx-auto z-20 bg-dark">
      <h2 className="text-2xl md:text-4xl pt-6 font-bold text-white">
        People also liked
      </h2>

      <section className="py-12">
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8">
          {related.map((item) => (
            <li className="relative h-full" key={item.id}>
              <Link href={`/details/${item.id}`}>
                <a
                  className={`block w-full h-[245px] md:h-[310px] bg-slate-100 rounded-md bg-cover bg-no-repeat`}
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
                      {item.vote_average.toFixed(1)}
                    </p>

                    {item.providers && item.providers["flatrate"] ? (
                      <img
                        key={item.providers["flatrate"][0].provider_id}
                        src={getProviderImage(
                          item.providers["flatrate"][0].provider_id,
                          item.providers["flatrate"][0].logo_path
                        )}
                        alt={item.providers["flatrate"][0].provider_name}
                        className="w-12 h-12 object-contain"
                      />
                    ) : null}
                  </article>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Related;
