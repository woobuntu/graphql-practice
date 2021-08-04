import { v4 } from "uuid";

const createPost = (parent, { post }, { db: { users, posts } }, info) => {
  const userExists = users.some(({ id }) => id == post.author);

  if (!userExists) throw new Error("존재하지 않는 사용자입니다.");

  const newPost = {
    id: v4(),
    ...post,
  };

  posts.push(newPost);

  return newPost;
};

export default createPost;
