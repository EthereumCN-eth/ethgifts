/*
  Warnings:

  - You are about to drop the `gallery` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `nft` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `poap` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "gallery";

-- DropTable
DROP TABLE "nft";

-- DropTable
DROP TABLE "poap";

-- CreateTable
CREATE TABLE "NFT" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "imageLinks" TEXT[],
    "videoLinks" TEXT[],
    "chainId" INTEGER NOT NULL,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poap" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "imageLinks" TEXT[],
    "videoLinks" TEXT[],
    "chainId" INTEGER NOT NULL,

    CONSTRAINT "Poap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gallery" (
    "id" SERIAL NOT NULL,
    "typeName" TEXT NOT NULL,
    "typeId" INTEGER NOT NULL,
    "tags" TEXT[],
    "eventStartTime" INTEGER,
    "eventDuration" INTEGER,

    CONSTRAINT "Gallery_pkey" PRIMARY KEY ("id")
);
