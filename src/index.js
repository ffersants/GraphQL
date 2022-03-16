import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import knexConfig from '../knexfile'
import knex from 'knex'
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

import {users, posts, comments} from '../db.json'

async function startServer(){
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
    handleProtocols: true
  });

  //starts the ws server
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
            //method to free resources. It's executed when the server is stopped
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
  //starts the http server
  await server.start();

  server.applyMiddleware({ app });

  await new Promise(resolve => httpServer.listen({ port: 7000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:7000${server.graphqlPath}`);
}

async function databaseCharge(){
  const connection = knex(knexConfig.staging)

  comments.map(async(_comment) => {
    const {comment, body, userId} = _comment

    await connection('comments')
      .insert({
        comment,
        postId: Math.floor(Math.random() * 60) + 1,
        authorId: Math.floor(Math.random() * 20) + 1
      })
  })
  
  posts.map(async(post) => {
    const {title, body, userId} = post

    await connection('posts')
      .insert({
        title,
        body,
        userId: Math.floor(Math.random() * 20) + 1
      })
  })
  
  users.map(async(user) => {
    const {firstName, lastName, userName} = posts

    await connection('users')
      .insert({
        firstName,
        lastName,
        userName,
        pswd: '123'
      })
  })

}

startServer()
