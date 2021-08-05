import { v4 } from "uuid";

const createPost = (
  parent,
  { post },
  { db: { users, posts }, pubsub },
  info
) => {
  const userExists = users.some(({ id }) => id == post.author);

  if (!userExists) throw new Error("존재하지 않는 사용자입니다.");

  const newPost = {
    id: v4(),
    ...post,
  };

  posts.push(newPost);

  // 게시되지 않은 post의 생성까지 publish할 필요는 없음
  newPost.publish && pubsub.publish("posts", { posts });

  return newPost;
};

export default createPost;
