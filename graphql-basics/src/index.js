import { GraphQLServer } from "graphql-yoga";

// 더미 데이터
const users = [
  { id: "1", name: "woobuntu", email: "이메일" },
  {
    id: "2",
    name: "name",
    email: "email",
  },
];
const posts = [
  {
    id: "1",
    title: "title",
    body: "body",
    published: false,
    author: "1",
  },
  {
    id: "2",
    title: "제목",
    body: "내용",
    published: false,
    author: "2",
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
      me: User!
      users(query: String): [User!]!
      post: Post!
      posts(query: String): [Post!]!
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
      author: User!
    }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: "1",
        name: "이인우",
        email: "woobuntu@mail.mail",
        age: 30,
      };
    },
    users(parent, args, ctx, info) {
      const { query } = args;
      return query
        ? users.filter(({ name }) =>
            name.toLowerCase().includes(query.toLowerCase())
          )
        : users;
    },
    post(parent, args, ctx, info) {
      return {
        id: "1",
        title: "GraphQL",
        body: "에라이",
        published: false,
      };
    },
    posts(parent, { query }, ctx, info) {
      return query
        ? posts.filter(({ title, body }) => {
            const loweredQuery = query.toLowerCase();
            const isMatchedWithEachOther = (column, value) =>
              column.toLowerCase().includes(value);
            return (
              isMatchedWithEachOther(title, loweredQuery) ||
              isMatchedWithEachOther(body, loweredQuery)
            );
          })
        : posts;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id == parent.author);
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
