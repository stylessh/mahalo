import "styles/globals.css";

import Navbar from "components/Navbar";
import { Toaster } from "react-hot-toast";

import AuthContextProvider from "context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar />

      <Component {...pageProps} />

      <Toaster position="bottom-left" />
    </AuthContextProvider>
  );
}

export default MyApp;
