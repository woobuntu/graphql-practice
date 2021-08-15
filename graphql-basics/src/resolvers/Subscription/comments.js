import prisma from "../../prisma";

const comments = {
  subscribe: async (parent, { postId }, { pubsub }, info) => {
    try {
      const post = await prisma.post.findFirst({
        where: {
          AND: [
            {
              id: postId,
            },
            {
              published: true,
            },
          ],
        },
      });

      if (!post) throw new Error(`id가 ${postId}인 post가 존재하지 않습니다.`);

      return pubsub.asyncIterator(`comments in post ${postId}`);
    } catch (error) {
      throw error;
    }
  },
};

export default comments;
