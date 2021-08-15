import prisma from "../../prisma";

const main = async (parent, { query }, ctx, info) => {
  try {
    const findManyCondition = query
      ? {
          where: {
            text: {
              contains: query,
            },
          },
        }
      : null;

    const comments = await prisma.comment.findMany(findManyCondition);
    return comments;
  } catch (error) {
    throw error;
  }
};

export default main;
