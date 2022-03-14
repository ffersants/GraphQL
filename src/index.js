import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import knexConfig from '../knexfile'
import express from 'express';
import http from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

import { typeDefs, resolvers } from "./graphql/schema";
import { context } from "./graphql/context";
import {PostsApi} from './graphql/post/datasource'
import {UsersApi} from './graphql/user/datasource'
import {CommentsApi} from './graphql/comment/datasource'

async function startServer(){
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` we created in a previous step.
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: '/graphql',
    handleProtocols: true
  });

  const serverCleanup = useServer(
    { schema,
      onConnect: async(i) => {
        console.log('conectou')
      },
     
    },
    wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer(){
              await serverCleanup.dispose()
            }
          }
        }
      }
      
    ], 
    context,
    dataSources: () => ({
      postsApi: new PostsApi(knexConfig.staging),
      usersApi: new UsersApi(knexConfig.staging),
      commentsApi: new CommentsApi(knexConfig.staging)
    }),
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 7000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:7000${server.graphqlPath}`);
}

startServer()
