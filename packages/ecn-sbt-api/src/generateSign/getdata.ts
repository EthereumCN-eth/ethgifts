import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface signData {
  ethAddrss: string;
  contributions: {
    [expressId: number]: {
      content: string;
      contentURI: string;
      publishedDate: number;
    };
  };
}

const getAddress = async (discordId: string) => {};

const getContributions = async (discordId: string) => {};

const getData = async (discordId: string) => {
  try {
    const users = await prisma.user.findUnique({
      where: {
        discordId: discordId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
