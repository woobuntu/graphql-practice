import prisma from "../../prisma";

const main = async (parent, args, ctx, info) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: parent.id,
      },
    });
    return posts;
  } catch (error) {
    throw error;
  }
};

export default main;
