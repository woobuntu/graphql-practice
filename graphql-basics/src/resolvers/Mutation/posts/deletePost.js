const deletePost = (parent, args, { db: { posts, comments } }, info) => {
  // post 있는지 확인
  const indexOfPostToBeDeleted = posts.findIndex(({ id }) => id == args.id);
  // 없으면 에러 반환
  if (indexOfPostToBeDeleted == -1)
    throw new Error(`id ${args.id}의 post가 존재하지 않습니다.`);
  // 있으면 관련 커멘트 지우기
  comments = comments.filter(({ post }) => post !== args.id);
  // post 지우기
  const [deletedPost] = posts.splice(indexOfPostToBeDeleted, 1);

  return deletedPost;
};

export default deletePost;
