import prisma from "../../../prisma";

const main = async (parent, { comment }, { pubsub }, info) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: comment.authorId,
      },
    });

    if (!user)
      throw new Error(`id ${comment.authorId}의 user는 존재하지 않습니다.`);

    const post = await prisma.post.findUnique({
      where: {
        id: comment.postId,
      },
      include: {
        comments: true,
      },
    });

    if (!post)
      throw new Error(`id ${comment.postId}의 post는 존재하지 않습니다.`);

    if (!post.published)
      throw new Error("해당 게시물은 아직 게시되지 않았습니다.");

    pubsub.publish(`comments in post ${comment.postId}`, {
      comments: post.comments,
    });

    return await prisma.comment.create({
      data: {
        ...comment,
        authorId: comment.authorId,
      },
    });
  } catch (error) {
    throw error;
  }
};

export default main;
