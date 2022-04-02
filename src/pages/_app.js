import "styles/globals.css";

import NextNProgress from "nextjs-progressbar";

import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";

import AuthContextProvider from "context/authContext";
import MoviesContextProvider from "context/moviesContext";
import ProvidersContextProvider from "context/providersContext";

function MyApp({ Component, pageProps }) {
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

      <Navbar />

      <MoviesContextProvider>
        <ProvidersContextProvider>
          <Component {...pageProps} />
        </ProvidersContextProvider>
      </MoviesContextProvider>

      <Toaster position="bottom-left" />
    </AuthContextProvider>
  );
}

export default MyApp;
