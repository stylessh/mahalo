import { useEffect, useState } from "react";

import useMovies from "hooks/useMovies";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

import getProviderImage from "utils/getProviderImage";
import useProviders from "hooks/useProviders";
import axios from "axios";
import Spinner from "components/Spinner";

const EndMessage = () => (
  <p className="absolute bottom-0 text-white font-bold left-2/4">
    <b>Hey, you have seen it all!</b>
  </p>
);

const Loading = () => (
  <h4 className="absolute bottom-0 text-white font-bold left-2/4">
    Loading...
  </h4>
);

const MyServices = () => {
  const {
    customMovies,
    setCustomMovies,
    customMoviesPage,
    setCustomMoviesPage,
    loading,
    setLoading,
  } = useMovies();
  const { providersIds } = useProviders();

  useEffect(() => {
    if (customMovies.length === 0) {
      setLoading(true);

      axios
        .get("/api/movies/custom", {
          params: {
            providers: providersIds.join("|"),
            page: customMoviesPage,
          },
        })
        .then((res) => {
          setCustomMovies(res.data);

          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const loadMore = async () => {
    setCustomMoviesPage(customMoviesPage + 1);

    const { data } = await axios.get("/api/movies/custom", {
      params: {
        providers: providersIds.join("|"),
        page: customMoviesPage + 1,
      },
    });

    setCustomMovies([...customMovies, ...data]);
  };

  return (
    <section className="my-12">
      {loading && <Spinner />}

      {!loading && (
        <InfiniteScroll
          dataLength={customMovies.length}
          next={async () => await loadMore()}
          hasMore={true}
          loader={<Loading />}
          endMessage={<EndMessage />}
          className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-8"
        >
          {customMovies.map((item) => (
            <li
              className="relative h-full outline-none list-none"
              key={item.id}
            >
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
                      {item.vote_average}
                    </p>

                    {item.providers && (
                      <ul className="-space-y-2">
                        {item.providers["flatrate"]?.map((provider) => (
                          <img
                            key={provider.provider_id}
                            src={getProviderImage(
                              provider.provider_id,
                              provider.logo_path
                            )}
                            alt={provider.provider_name}
                            className="w-12 h-12 object-contain"
                          />
                        ))}

                        {!item.providers["flatrate"] && (
                          <>
                            {item.providers["buy"] || item.providers["rent"] ? (
                              <img
                                src="/assets/providers/RentBuy.png"
                                alt="RentBuy"
                                className="w-12 h-12 object-contain"
                              />
                            ) : null}
                          </>
                        )}
                      </ul>
                    )}
                  </article>
                </a>
              </Link>
            </li>
          ))}
        </InfiniteScroll>
      )}
    </section>
  );
};

export default MyServices;
