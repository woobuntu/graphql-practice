import prisma from "../../../prisma";

const main = async (parent, { user }, ctx, info) => {
  try {
    const emailList = await prisma.user.findMany({
      select: {
        email: true,
      },
    });

    const emailTaken = emailList.includes(user.email);

    if (emailTaken) throw new Error("Email taken.");

    return await prisma.user.create({
      data: user,
    });
  } catch (error) {
    throw error;
  }
};

export default main;
