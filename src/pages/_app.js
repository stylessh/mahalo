import "styles/globals.css";

import NextNProgress from "nextjs-progressbar";

import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";

import AuthContextProvider from "context/authContext";

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

      <Component {...pageProps} />

      <Toaster position="bottom-left" />
    </AuthContextProvider>
  );
}

export default MyApp;
