import { v4 } from "uuid";

const Mutation = {
  createUser(parent, { user }, { db: { users } }, info) {
    const emailTaken = users.some(({ email }) => email == user.email);

    if (emailTaken) throw new Error("Email taken.");

    const newUser = {
      id: v4(),
      ...user,
    };

    users.push(newUser);

    return newUser;
  },
  deleteUser(parent, args, { db: { users, posts, comments } }, info) {
    const userIndex = users.findIndex(({ id }) => id === args.id);

    if (userIndex == -1)
      throw new Error(`${args.id}의 사용자는 존재하지 않습니다.`);

    const deletedUser = users[userIndex];

    users = users.filter(({ id }) => id !== args.id);
    posts = posts.filter(({ id, author }) => {
      const match = author == args.id;

      if (match) comments = comments.filter(({ post }) => post !== id);

      return !match;
    });
    comments = comments.filter(({ author }) => author !== args.id);

    return deletedUser;
  },
  createPost(parent, { post }, { db: { users, posts } }, info) {
    const userExists = users.some(({ id }) => id == post.author);

    if (!userExists) throw new Error("존재하지 않는 사용자입니다.");

    const newPost = {
      id: v4(),
      ...post,
    };

    posts.push(newPost);

    return newPost;
  },
  deletePost(parent, args, { db: { posts, comments } }, info) {
    // post 있는지 확인
    const indexOfPostToBeDeleted = posts.findIndex(({ id }) => id == args.id);
    // 없으면 에러 반환
    if (indexOfPostToBeDeleted == -1)
      throw new Error(`id ${args.id}의 post가 존재하지 않습니다.`);
    // 있으면 관련 커멘트 지우기
    comments = comments.filter(({ post }) => post !== args.id);
    // post 지우기
    const [deletedPost] = posts.splice(indexOfPostToBeDeleted, 1);

    return deletedPost;
  },
  createComment(parent, { comment }, { db: { users, posts, comments } }, info) {
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
  deleteComment(parent, args, { db: { comments } }, info) {
    const indexOfCommentToBeDeleted = comments.findIndex(
      ({ id }) => id == args.id
    );

    if (indexOfCommentToBeDeleted == -1)
      throw new Error(`id ${args.id}인 comment는 존재하지 않습니다.`);

    const [deletedComment] = comments.splice(indexOfCommentToBeDeleted, 1);

    return deletedComment;
  },
};

export { Mutation as default };
