import SearchBar from "components/SearchBar";
import Tabs from "components/Tabs";
import Head from "next/head";

import { trendingMovies } from "services/movies";

export default function Home({ trending }) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-dark">
      {/* SEO HEAD */}
      <Head>
        <title>Mahalo TV</title>
      </Head>

      {/* Hero */}
      <section className="h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        {/* foreground */}
        <img
          src="/assets/movies-foreground.png"
          alt="Movies Foreground"
          className="absolute inset-0 select-none w-full h-full z-10 object-cover"
        />

        <h1 className="text-3xl md:text-5xl font-tight text-center leading-tight text-white z-20 px-6">
          All <b className="font-display">Streaming</b> <br /> services{" "}
          <b className="font-display">in one place</b>
        </h1>

        {/* search bar */}
        <SearchBar />
      </section>

      {/* content tabs */}
      <Tabs trending={trending} />
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
