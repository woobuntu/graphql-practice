import prisma from "../../prisma";

const main = async (parent, args, ctx, info) => {
  try {
    const commentsInPost = await prisma.comment.findMany({
      where: {
        postId: parent.id,
      },
    });
    return commentsInPost;
  } catch (error) {
    throw error;
  }
};

export default main;
