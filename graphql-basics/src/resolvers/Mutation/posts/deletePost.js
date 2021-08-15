import prisma from "../../../prisma";

const main = async (parent, args, { pubsub }, info) => {
  try {
    const postToBeDeleted = await prisma.post.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!postToBeDeleted)
      throw new Error(`id ${args.id}의 post가 존재하지 않습니다.`);

    const deletedPost = await prisma.post.delete({
      where: {
        id: args.id,
      },
    });

    const allPosts = await prisma.post.findMany();
    // 게시되지 않은 post의 삭제까지 publish할 필요는 없음
    deletedPost.published && pubsub.publish("posts", { posts: allPosts });

    return deletedPost;
  } catch (error) {
    throw error;
  }
};

export default main;
