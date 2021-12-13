import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://swapi-graphql-three.vercel.app",
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default client;
