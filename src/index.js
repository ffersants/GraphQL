import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import knexConfig from '../knexfile'
import express from 'express';
import http from 'http';

import { typeDefs, resolvers } from "./graphql/schema";
import { context } from "./graphql/context";
import {PostsApi} from './graphql/post/datasource'
import {UsersApi} from './graphql/user/datasource'
import {CommentsApi} from './graphql/comment/datasource'

async function startServer(){
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    typeDefs,
    resolvers,
    context,
    dataSources: () => ({
      postsApi: new PostsApi(knexConfig.staging),
      usersApi: new UsersApi(knexConfig.staging),
      commentsApi: new CommentsApi(knexConfig.staging)
    }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const port = 7000;

  await new Promise(resolve => httpServer.listen({ port: 7000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:7000${server.graphqlPath}`);
}

startServer()
