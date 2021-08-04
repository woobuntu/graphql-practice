const users = (parent, { query }, { db: { users } }, info) =>
  query
    ? users.filter(({ name }) =>
        name.toLowerCase().includes(query.toLowerCase())
      )
    : users;

export default users;
