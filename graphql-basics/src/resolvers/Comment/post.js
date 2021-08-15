import prisma from "../../prisma";

const main = async (parent, args, ctx, info) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: parent.postId,
      },
    });
    return post;
  } catch (error) {
    throw error;
  }
};

export default main;
