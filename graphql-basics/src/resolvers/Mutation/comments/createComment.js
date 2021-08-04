import { v4 } from "uuid";

const createComment = (
  parent,
  { comment },
  { db: { users, posts, comments } },
  info
) => {
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
};

export default createComment;
