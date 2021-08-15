import prisma from "../../../prisma";

const main = async (parent, args, { pubsub }, info) => {
  try {
    const commentToBeDeleted = await prisma.comment.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!commentToBeDeleted)
      throw new Error(`id ${args.id}인 comment는 존재하지 않습니다.`);

    const deletedComment = await prisma.comment.delete({
      where: {
        id: args.id,
      },
    });

    const commentsInPost = await prisma.comment.findMany({
      where: {
        postId: deletedComment.postId,
      },
    });

    pubsub.publish(`comments in post ${deletedComment.postId}`, {
      comments: commentsInPost,
    });

    return deletedComment;
  } catch (error) {
    throw error;
  }
};

export default main;
