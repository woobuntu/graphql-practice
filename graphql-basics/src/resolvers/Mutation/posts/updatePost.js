const updatePost = (
  parent,
  { id: idOfPostToBeUpdated, data },
  { db: { posts }, pubsub },
  info
) => {
  const { title, body, published } = data;

  const postToBeUpdated = posts.find(({ id }) => id == idOfPostToBeUpdated);

  const previousPublished = postToBeUpdated.published;

  if (!postToBeUpdated)
    throw new Error(`id가 ${idOfPostToBeUpdated}인 post는 존재하지 않습니다.`);

  if (typeof title == "string") postToBeUpdated.title = title;

  if (typeof body == "string") postToBeUpdated.body = body;

  if (typeof published == "boolean") postToBeUpdated.published = published;

  // 이전이든 이번이든 한 번이라도 게시되었으면 수정 상태를 반영해야 한다.
  if (previousPublished || published) pubsub.publish("posts", { posts });

  return postToBeUpdated;
};

export default updatePost;
