import { ApolloServer, gql } from "apollo-server";
import { typeDefs, resolvers } from "./graphql/schema";
import { context } from "./graphql/context";
import {PostsApi} from './graphql/post/datasource'
import {UsersApi} from './graphql/user/datasource'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources: () => ({
    postsApi: new PostsApi(),
    usersApi: new UsersApi()
  })
});

const port = 7000;

server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
