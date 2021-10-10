import { ApolloServer, gql } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/schema";

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const port = 7000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
