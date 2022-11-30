import { Poap, PrismaClient } from "@prisma/client";
import { nfts } from "./nfts";
import { sbts } from "./sbts";
import { poaps } from "./poaps";
// import { generateSignature } from "ecn-sbt-api";
const prisma = new PrismaClient();

export type NFTCreateData = Parameters<typeof prisma.nFT.create>[0]["data"];
export type SBTCreateData = Parameters<
  typeof prisma.sBTContractType.create
>[0]["data"];
export type PoapCreateData = Parameters<typeof prisma.poap.create>[0]["data"];
type ContentTypeCreateData = Parameters<
  typeof prisma.contentCategory.create
>[0]["data"];

const createOneNFTPromise = (input: NFTCreateData) =>
  prisma.nFT
    .create({
      data: input,
    })
    .then((item) => console.log(`nft ${item.id} created`));

const createOnePoapPromise = (input: PoapCreateData) =>
  prisma.poap
    .create({
      data: input,
    })
    .then((item) => console.log(`poap ${item.id} created`));

const createOneSBTPromise = (input: SBTCreateData) =>
  prisma.sBTContractType
    .create({
      data: input,
    })
    .then((item) => console.log(`sbt ${item.id} created`));

const createOneContentTypePromise = (input: ContentTypeCreateData) =>
  prisma.contentCategory
    .create({
      data: input,
    })
    .then((item) => console.log(`cotentType ${item.contentType} created`));

const contentTypes: ContentTypeCreateData[] = [
  {
    contentType: "eth2",
  },
  {
    contentType: "defi",
  },
  {
    contentType: "uncategorized",
  },
];

const main = async () => {
  // await Promise.all([
  //   ....map(createOneNFTPromise),

  //   // createMessages(rawMessages),
  // ]);

  for (const nft of nfts) {
    await createOneNFTPromise(nft);
  }

  await Promise.all([
    ...sbts.map(createOneSBTPromise),
    ...poaps.map(createOnePoapPromise),
    ...contentTypes.map(createOneContentTypePromise),
  ]);
  // const message = await createMessages(messages);
};

main()
  .then(() => {
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
