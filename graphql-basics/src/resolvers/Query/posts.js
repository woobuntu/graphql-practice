import prisma from "../../prisma";

const main = async (parent, { query }, ctx, info) => {
  try {
    const findManyCondition = query
      ? {
          where: {
            OR: [
              {
                title: {
                  contains: query,
                },
              },
              {
                body: {
                  contains: query,
                },
              },
            ],
          },
        }
      : null;

    const posts = await prisma.post.findMany(findManyCondition);

    return posts;
  } catch (error) {
    throw error;
  }
};

export default main;
