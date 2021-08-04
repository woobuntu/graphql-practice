const deleteUser = (parent, args, { db: { users, posts, comments } }, info) => {
  const userIndex = users.findIndex(({ id }) => id === args.id);

  if (userIndex == -1)
    throw new Error(`${args.id}의 사용자는 존재하지 않습니다.`);

  const deletedUser = users[userIndex];

  users = users.filter(({ id }) => id !== args.id);
  posts = posts.filter(({ id, author }) => {
    const match = author == args.id;

    if (match) comments = comments.filter(({ post }) => post !== id);

    return !match;
  });
  comments = comments.filter(({ author }) => author !== args.id);

  return deletedUser;
};

export default deleteUser;
