import { ApolloServer, gql } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/schema";
import { context } from "./graphql/context";
import {PostsApi} from './graphql/post/datasource'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    postsApi: new PostsApi()
  })
});

const port = 7000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
