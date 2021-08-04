const updateComment = (
  parent,
  { id: idOfCommentToBeUpdated, data: { text } },
  { db: { comments } },
  info
) => {
  const commentToBeUpdated = comments.find(
    ({ id }) => id == idOfCommentToBeUpdated
  );

  if (!commentToBeUpdated)
    throw new Error(
      `id가 ${idOfCommentToBeUpdated}인 comment가 존재하지 않습니다.`
    );

  if (typeof text == "string") commentToBeUpdated.text = text;

  return commentToBeUpdated;
};

export default updateComment;
