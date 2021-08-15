import prisma from "../../prisma";

const main = async (parent, args, ctx, info) => {
  try {
    const author = await prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
    return author;
  } catch (error) {
    throw error;
  }
};

export default main;
