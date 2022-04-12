import { useEffect } from "react";

import SearchBar from "components/SearchBar";
import Tabs from "components/Tabs";
import Head from "next/head";

import { trendingMovies } from "services/movies";
import useMovies from "hooks/useMovies";

export default function Home({ trending }) {
  const { setTrending } = useMovies();

  useEffect(() => {
    setTrending(trending);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-dark">
      {/* SEO HEAD */}
      <Head>
        <title>Mahalo TV - All Streaming services in one place.</title>
      </Head>

      {/* Hero */}
      <section className="h-[50vh] flex flex-col justify-end items-center mb-12">
        {/* foreground */}
        <img
          src="/assets/movies-foreground.png"
          alt="Movies Foreground"
          className="absolute inset-0 bg-center select-none w-full h-full z-10 object-contain"
        />

        <h1 className="text-3xl md:text-5xl font-tight text-center leading-tight text-white z-20 px-6">
          All <b className="font-display">Streaming</b> <br /> services{" "}
          <b className="font-display">in one place</b>
        </h1>

        {/* search bar */}
        <SearchBar />
      </section>

      {/* content tabs */}
      <Tabs />
    </main>
  );
}

export async function getServerSideProps() {
  // getting movies results
  const trending = await trendingMovies();

  return {
    props: {
      trending,
    },
  };
}
