import { GraphQLServer } from "graphql-yoga";
import db from "./db";
import resolvers from "./resolvers";

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql", // root 디렉토리 기준 상대경로
  resolvers,
  context: {
    db,
  },
});

server.start(() => {
  console.log("The server is up!");
});
