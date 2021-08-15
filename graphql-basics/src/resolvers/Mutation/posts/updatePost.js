import prisma from "../../../prisma";

const main = async (
  parent,
  { id: idOfPostToBeUpdated, data },
  { pubsub },
  info
) => {
  try {
    const { title, body, published } = data;

    const postToBeUpdated = await prisma.post.findUnique({
      where: {
        id: idOfPostToBeUpdated,
      },
    });

    if (!postToBeUpdated)
      throw new Error(
        `id가 ${idOfPostToBeUpdated}인 post는 존재하지 않습니다.`
      );

    const previousPublished = postToBeUpdated.published;

    const dataToBeUpdated = {};
    if (typeof title == "string") dataToBeUpdated.title = title;
    if (typeof body == "string") dataToBeUpdated.body = body;
    if (typeof published == "boolean") dataToBeUpdated.published = published;

    const updatedPost = await prisma.post.update({
      where: {
        id: idOfPostToBeUpdated,
      },
      data: dataToBeUpdated,
    });

    const allPosts = await prisma.post.findMany();
    // 이전이든 이번이든 한 번이라도 게시되었으면 수정 상태를 반영해야 한다.
    if (previousPublished || published)
      pubsub.publish("posts", { posts: allPosts });

    return updatedPost;
  } catch (error) {
    throw error;
  }
};

export default main;
