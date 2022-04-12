import React from "react";

const Footer = () => {
  return (
    <footer className="p-12 bg-dark text-center flex flex-col justify-center items-center text-sm md:text-base">
      <p className="text-white font-bold">
        Copyright © 2021 - All rights reserved by Mahalo.tv
      </p>

      <p className="text-gray-500 mt-4">
        This website uses
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 px-2 hover:underline"
        >
          TMDB
        </a>
        and
        <a
          href="https://www.justwatch.com/"
          target="_blank"
          rel="noreferrer"
          className="text-yellow-200 px-2 hover:underline"
        >
          JustWatch
        </a>
        services to get movies information.
      </p>
    </footer>
  );
};

export default Footer;
