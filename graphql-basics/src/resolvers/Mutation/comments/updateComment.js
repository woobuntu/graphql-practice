import prisma from "../../../prisma";

const main = async (
  parent,
  { id: idOfCommentToBeUpdated, data: { text } },
  { pubsub },
  info
) => {
  try {
    const commentToBeUpdated = prisma.comment.findUnique({
      where: {
        id: idOfCommentToBeUpdated,
      },
    });

    if (!commentToBeUpdated)
      throw new Error(
        `id가 ${idOfCommentToBeUpdated}인 comment가 존재하지 않습니다.`
      );

    const dataToBeUpdated = {};
    if (typeof text == "string") dataToBeUpdated.text = text;

    const updatedComment = await prisma.comment.update({
      where: {
        id: idOfCommentToBeUpdated,
      },
      data: dataToBeUpdated,
    });

    const commentsInPost = await prisma.comment.findMany({
      where: {
        postId: updatedComment.postId,
      },
    });

    pubsub.publish(`comments in post ${updatedComment.postId}`, {
      comments: commentsInPost,
    });

    return updatedComment;
  } catch (error) {
    throw error;
  }
};

export default main;
