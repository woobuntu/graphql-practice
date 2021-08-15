import prisma from "../../../prisma";

const main = async (parent, args, { pubsub }, info) => {
  try {
    const userToBeDeleted = await prisma.user.findUnique({
      where: {
        id: args.id,
      },
    });

    if (!userToBeDeleted)
      throw new Error(`${args.id}의 사용자는 존재하지 않습니다.`);

    const deletedUser = await prisma.user.delete({
      where: {
        id: args.id,
      },
      include: {
        posts: true,
        comments: true,
      },
    });

    // user를 삭제할 때 관련 post와 comment도 삭제되므로
    // 전체 post 목록 publish와
    if (deletedUser.posts.length)
      pubsub.publish("posts", {
        posts: await prisma.post.findMany(),
      });

    // 유저가 작성한 댓글의 post를 publish해주는 기능 필요
    if (deletedUser.comments.length)
      deletedUser.comments.forEach(async ({ postId }) =>
        pubsub.publish(`comments in post ${postId}`, {
          comments: await prisma.comment.findMany({
            where: {
              postId: postId,
            },
          }),
        })
      );

    return deletedUser;
  } catch (error) {
    throw error;
  }
};

export default main;
