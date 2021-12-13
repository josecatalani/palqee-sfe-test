import React from "react";
import "../styles/globals.scss";
import { ApolloProvider } from "@apollo/client";
import App from "../ui/common/App";
import client from "../apollo/connection";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <App>
        <Component {...pageProps} />
      </App>
    </ApolloProvider>
  );
}

export default MyApp;
