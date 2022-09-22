-- AlterTable
ALTER TABLE "SBTContractType" ADD COLUMN     "imageLink" TEXT[];

-- CreateTable
CREATE TABLE "nft" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "imageLink" TEXT[],
    "chainId" INTEGER NOT NULL,

    CONSTRAINT "nft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "poap" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageLink" TEXT[],

    CONSTRAINT "poap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "tags" TEXT[],
    "eventStartTime" INTEGER,
    "eventDuration" INTEGER,

    CONSTRAINT "gallery_pkey" PRIMARY KEY ("id")
);
