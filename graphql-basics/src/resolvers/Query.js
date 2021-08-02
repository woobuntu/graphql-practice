const Query = {
  me() {
    return {
      id: "1",
      name: "이인우",
      email: "woobuntu@mail.mail",
      age: 30,
    };
  },
  users(parent, args, { db: { users } }, info) {
    const { query } = args;
    return query
      ? users.filter(({ name }) =>
          name.toLowerCase().includes(query.toLowerCase())
        )
      : users;
  },
  post(parent, args, ctx, info) {
    return {
      id: "1",
      title: "GraphQL",
      body: "에라이",
      published: false,
    };
  },
  posts(parent, { query }, { db: { posts } }, info) {
    return query
      ? posts.filter(({ title, body }) => {
          const loweredQuery = query.toLowerCase();
          const isMatchedWithEachOther = (column, value) =>
            column.toLowerCase().includes(value);
          return (
            isMatchedWithEachOther(title, loweredQuery) ||
            isMatchedWithEachOther(body, loweredQuery)
          );
        })
      : posts;
  },
  comments(parent, args, { db: { comments } }, info) {
    const { query } = args;
    return query
      ? comments.filter(({ text }) => {
          const loweredQuery = query.toLowerCase();
          return text.toLowerCase().includes(loweredQuery);
        })
      : comments;
  },
};

export { Query as default };
