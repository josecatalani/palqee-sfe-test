import React from "react";
import "../styles/globals.scss";
import App from "../ui/common/App";

function MyApp({ Component, pageProps }) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

export default MyApp;
