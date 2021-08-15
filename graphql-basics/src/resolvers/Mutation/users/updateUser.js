import prisma from "../../../prisma";

const main = async (parent, { id: idOfUserToBeUpdated, data }, ctx, info) => {
  try {
    const userToBeUpdated = await prisma.user.findUnique({
      where: {
        id: idOfUserToBeUpdated,
      },
    });

    if (!userToBeUpdated)
      throw new Error(`${idOfUserToBeUpdated}의 사용자는 존재하지 않습니다.`);

    const dataToBeUpdated = {};

    if (typeof data.email === "string") {
      const userWithInputEmail = await prisma.user.findFirst({
        where: {
          email: {
            contains: data.email,
          },
        },
      });

      if (userWithInputEmail)
        throw new Error(`${data.email}은 이미 존재하는 이메일입니다.`);
      else dataToBeUpdated.email = data.email;
    }
    if (typeof data.name === "string") dataToBeUpdated.name = data.name;
    if (typeof data.name !== "undefined") dataToBeUpdated.age = data.age;

    const updatedUser = await prisma.user.update({
      where: {
        id: idOfUserToBeUpdated,
      },
      data: dataToBeUpdated,
    });

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export default main;
