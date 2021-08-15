import prisma from "../../prisma";

const main = async (parent, args, ctx, info) => {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        authorId: parent.id,
      },
    });
    return comments;
  } catch (error) {
    throw error;
  }
};

export default main;
