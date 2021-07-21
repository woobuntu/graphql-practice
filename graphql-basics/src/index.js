import { GraphQLServer } from "graphql-yoga";

// Type definitions (schema)

const typeDefs = `
    type Query {
      greeting(name: String, position:String): String!
      me: User!
      post: Post!
      add(a: Float!, b: Float!): Float!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int 
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      const { name, position } = args;
      return `Hello${
        name && position ? `, ${name} You are my favorite ${position}` : ""
      }!`;
    },
    me() {
      return {
        id: "1",
        name: "이인우",
        email: "woobuntu@mail.mail",
        age: 30,
      };
    },
    post() {
      return {
        id: "1",
        title: "GraphQL",
        body: "에라이",
        published: false,
      };
    },
    add(_, { a, b }) {
      return a + b;
    },
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("The server is up!");
});
