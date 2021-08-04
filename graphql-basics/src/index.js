import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import resolvers from "./resolvers";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql", // root 디렉토리 기준 상대경로
  resolvers,
  context: {
    db,
    pubsub, // Subscription resolver에서 필요로 한다.
  },
});

server.start(() => {
  console.log("The server is up!");
});
