import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from "@apollo/client"

const httpLink = new HttpLink({
  uri: "https://swapi-graphql.netlify.app/.netlify/functions/index"
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([httpLink])
});