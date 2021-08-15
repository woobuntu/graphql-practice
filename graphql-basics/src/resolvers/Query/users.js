import prisma from "../../prisma";

const main = async (parent, { query }, ctx, info) => {
  try {
    const findManyCondition = query
      ? {
          where: {
            name: {
              contains: query,
            },
          },
        }
      : null;

    const users = await prisma.user.findMany(findManyCondition);

    return users;
  } catch (error) {
    throw error;
  }
};

export default main;
