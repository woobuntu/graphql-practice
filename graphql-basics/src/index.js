import { GraphQLServer } from "graphql-yoga";
import { v4 } from "uuid";

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
    published: true,
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

const comments = [
  { id: "1", text: "댓글1", author: "1", post: "1" },
  { id: "2", text: "댓글2", author: "1", post: "2" },
  { id: "3", text: "댓글3", author: "2", post: "1" },
  { id: "4", text: "댓글4", author: "2", post: "2" },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
      me: User!
      users(query: String): [User!]!
      post: Post!
      posts(query: String): [Post!]!
      comments(query: String): [Comment!]!
    }

    type Mutation {
      createUser(user: CreateUserInput!): User!
      createPost(post: CreatePostInput!): Post!
      createComment(comment: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
      name: String!
      email: String!
      age: Int
    }
    
    input CreatePostInput {
      title: String!
      body: String!
      published: Boolean!
      author: ID!
    }

    input CreateCommentInput {
      text: String!
      author: ID!
      post: ID!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int 
      posts(query: String): [Post!]!
      comments(query: String): [Comment!]!
    }

    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
      comments(query: String): [Comment!]!
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
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
    comments(parent, args, ctx, info) {
      const { query } = args;
      return query
        ? comments.filter(({ text }) => {
            const loweredQuery = query.toLowerCase();
            return text.toLowerCase().includes(loweredQuery);
          })
        : comments;
    },
  },
  Mutation: {
    createUser(parent, { user }, ctx, info) {
      const emailTaken = users.some(({ email }) => email == user.email);

      if (emailTaken) throw new Error("Email taken.");

      const newUser = {
        id: v4(),
        ...user,
      };

      users.push(newUser);

      return newUser;
    },
    createPost(parent, { post }, ctx, info) {
      const userExists = users.some(({ id }) => id == post.author);

      if (!userExists) throw new Error("존재하지 않는 사용자입니다.");

      const newPost = {
        id: v4(),
        ...post,
      };

      posts.push(newPost);

      return newPost;
    },
    createComment(parent, { comment }, ctx, info) {
      const userExists = users.some(({ id }) => id == comment.author);

      if (!userExists) throw new Error("존재하지 않는 사용자입니다.");

      const postExistsAndPublished = posts.some(
        ({ id, published }) => id == comment.post && published
      );

      if (!postExistsAndPublished)
        throw new Error("post가 존재하지 않거나 게시되지 않은 post입니다.");

      const newComment = {
        id: v4(),
        ...comment,
      };

      comments.push(newComment);

      return newComment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id == parent.author);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(({ post }) => post == parent.id);
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(({ author }) => author == parent.id);
    },
    comments(parent, args, ctx, info) {
      return comments.filter(({ author }) => author == parent.id);
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(({ id }) => id == parent.author);
    },
    post(parent, args, ctx, info) {
      return posts.find(({ id }) => id == parent.post);
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
