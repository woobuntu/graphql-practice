const deleteComment = (parent, args, { db: { comments }, pubsub }, info) => {
  const indexOfCommentToBeDeleted = comments.findIndex(
    ({ id }) => id == args.id
  );

  if (indexOfCommentToBeDeleted == -1)
    throw new Error(`id ${args.id}인 comment는 존재하지 않습니다.`);

  const [deletedComment] = comments.splice(indexOfCommentToBeDeleted, 1);

  const commentsInPost = comments.filter(
    ({ post }) => post == deletedComment.post
  );

  pubsub.publish(`comments in post ${deletedComment.post}`, {
    comments: commentsInPost,
  });

  return deletedComment;
};

export default deleteComment;
