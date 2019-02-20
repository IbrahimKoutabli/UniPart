import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:8080/query"
});

export default client;
