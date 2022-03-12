import SearchBar from "components/SearchBar";
import Tabs from "components/Tabs";

import trendingMovies from "services/trendingMovies";

export default function Home({ trending }) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="h-[calc(100vh-100px)] flex flex-col justify-center items-center">
        <h1 className="text-5xl font-normal text-center leading-tight">
          All <b className="font-bold">Streaming</b> <br /> services{" "}
          <b className="font-bold">in one place</b>
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
