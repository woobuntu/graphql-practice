const updateUser = (
  parent,
  { id: idOfUserToBeUpdated, data },
  { db: { users } },
  info
) => {
  const userToBeUpdated = users.find(({ id }) => id === idOfUserToBeUpdated);

  if (!userToBeUpdated)
    throw new Error(`${idOfUserToBeUpdated}의 사용자는 존재하지 않습니다.`);

  if (typeof data.email === "string") {
    if (users.some(({ email }) => email === data.email))
      throw new Error(`${data.email}은 이미 존재하는 이메일입니다.`);
    else userToBeUpdated.email = data.email;
  }

  if (typeof data.name === "string") userToBeUpdated.name = data.name;

  if (typeof data.name !== "undefined") userToBeUpdated.age = data.age;

  return userToBeUpdated;
};

export default updateUser;
