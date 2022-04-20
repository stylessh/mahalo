import "styles/globals.css";

import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

import AuthContextProvider from "context/authContext";
import MoviesContextProvider from "context/moviesContext";
import ProvidersContextProvider from "context/providersContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const startScreen = pathname === "/start";

  return (
    <AuthContextProvider>
      <Head>
        {/* FAVICON */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon.png"
        />
      </Head>

      {/* Progress bar */}
      <NextNProgress
        color="#E17CFD"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
        options={{
          showSpinner: false,
        }}
      />

      {!startScreen && <Navbar />}

      <MoviesContextProvider>
        <ProvidersContextProvider>
          <Component {...pageProps} />
        </ProvidersContextProvider>
      </MoviesContextProvider>

      {!startScreen && <Footer />}

      <Toaster position="bottom-left" />
    </AuthContextProvider>
  );
}

export default MyApp;
