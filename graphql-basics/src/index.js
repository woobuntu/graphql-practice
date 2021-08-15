import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "./resolvers";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql", // root 디렉토리 기준 상대경로
  resolvers,
  context: {
    pubsub, // Subscription resolver에서 필요로 한다.,
    prisma,
  },
});

server.start(() => {
  console.log("The server is up!");
});
