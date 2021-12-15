import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allPeople: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: new HttpLink({
    uri: `https://swapi-graphql.netlify.app/.netlify/functions/index`
  }),
  cache,
});

export default client;
