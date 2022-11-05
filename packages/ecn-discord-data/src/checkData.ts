import { User, PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

const checkData = async () => {
  const totalMessage = await prisma.expressMessage.findMany();
  console.log(totalMessage.length);

  const allUsers = await prisma.user.findMany();
  allUsers.forEach((user) => {
    console.log(user);
  });

  const signature = await prisma.signaturePayload.findMany();
  console.log(signature.length);
};

// reformatContents();
checkData();
