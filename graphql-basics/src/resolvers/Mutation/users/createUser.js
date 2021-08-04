import { v4 } from "uuid";

const createUser = (parent, { user }, { db: { users } }, info) => {
  const emailTaken = users.some(({ email }) => email == user.email);

  if (emailTaken) throw new Error("Email taken.");

  const newUser = {
    id: v4(),
    ...user,
  };

  users.push(newUser);

  return newUser;
};

export default createUser;
