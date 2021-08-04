const updatePost = (
  parent,
  { id: idOfPostToBeUpdated, data },
  { db: { posts } },
  info
) => {
  const { title, body, published } = data;

  const postToBeUpdated = posts.find(({ id }) => id == idOfPostToBeUpdated);

  if (!postToBeUpdated)
    throw new Error(`id가 ${idOfPostToBeUpdated}인 post는 존재하지 않습니다.`);

  if (typeof title == "string") postToBeUpdated.title = title;

  if (typeof body == "string") postToBeUpdated.body = body;

  if (typeof published == "boolean") postToBeUpdated.published = published;

  return postToBeUpdated;
};

export default updatePost;
