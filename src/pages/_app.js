import "styles/globals.css";

import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { Toaster } from "react-hot-toast";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

import AuthContextProvider from "context/authContext";
import MoviesContextProvider from "context/moviesContext";
import ProvidersContextProvider from "context/providersContext";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();
  const startScreen = pathname === "/start";

  return (
    <AuthContextProvider>
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
