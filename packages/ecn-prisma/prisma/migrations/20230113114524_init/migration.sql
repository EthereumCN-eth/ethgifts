-- CreateEnum
CREATE TYPE "urlType" AS ENUM ('media', 'ogData', 'onlyMeta', 'noMeta');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ERC721', 'ERC1155');

-- CreateEnum
CREATE TYPE "GalleryItemType" AS ENUM ('poap', 'nft', 'sbt');

-- CreateEnum
CREATE TYPE "MainViewType" AS ENUM ('image', 'video', 'wordart');

-- CreateEnum
CREATE TYPE "NFTAppType" AS ENUM ('PERSENT', 'DELIVERY');

-- CreateTable
CREATE TABLE "RawExpressMessage" (
    "id" TEXT NOT NULL,
    "rawMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parsedUrl" TEXT NOT NULL,
    "parsedMessage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RawExpressMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpressMessage" (
    "id" TEXT NOT NULL,
    "expressUrl" TEXT NOT NULL,
    "expressMessage" TEXT NOT NULL,
    "verifiedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,

    CONSTRAINT "ExpressMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MetaData" (
    "messageId" TEXT NOT NULL,
    "urlType" "urlType" NOT NULL DEFAULT 'media',
    "title" TEXT,
    "description" TEXT,
    "imageUrl" TEXT,
    "site" TEXT,
    "creator" TEXT,
    "videoUrl" TEXT,

    CONSTRAINT "MetaData_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "User" (
    "discordId" TEXT NOT NULL,
    "discordAvatar" TEXT,
    "name" TEXT NOT NULL,
    "ethAddress" TEXT,
    "expressCount" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "ContentCategory" (
    "contentType" TEXT NOT NULL,

    CONSTRAINT "ContentCategory_pkey" PRIMARY KEY ("contentType")
);

-- CreateTable
CREATE TABLE "SBTSignatureRecord" (
    "userId" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "sbtContractTypeId" INTEGER NOT NULL,
    "signedVC" TEXT NOT NULL,
    "signaturePayloadId" TEXT NOT NULL,
    "signatureData" TEXT NOT NULL,

    CONSTRAINT "SBTSignatureRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignaturePayload" (
    "metadataURI" TEXT NOT NULL,
    "receiverETHAddress" TEXT NOT NULL,
    "expressCount" INTEGER NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "SignaturePayload_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GalleryItemBase" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "itemText" TEXT[],
    "coverLink" TEXT NOT NULL,
    "mainViewType" "MainViewType" NOT NULL DEFAULT 'image',
    "imageLinks" TEXT[],
    "videoLinks" TEXT[],
    "chainId" INTEGER NOT NULL,
    "tags" TEXT[],
    "tokenType" "TokenType" NOT NULL DEFAULT 'ERC721',
    "tokenId" TEXT,
    "eventStartTime" INTEGER NOT NULL,
    "eventDuration" INTEGER,
    "galleryItemType" "GalleryItemType" NOT NULL,
    "onShelf" BOOLEAN NOT NULL,
    "infoDetail" JSONB,

    CONSTRAINT "GalleryItemBase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SBTContractType" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "contractName" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "chainId" INTEGER NOT NULL,
    "galleryItemBaseId" INTEGER NOT NULL,
    "metaDataName" TEXT NOT NULL,
    "metaDataDescription" TEXT NOT NULL,
    "issuerAddress" TEXT NOT NULL,
    "countLevel" INTEGER[],

    CONSTRAINT "SBTContractType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFTDeliveryData" (
    "merkleUrl" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "tokenType" "TokenType" NOT NULL DEFAULT 'ERC721',
    "tokenId" TEXT,
    "id" INTEGER NOT NULL,

    CONSTRAINT "NFTDeliveryData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NFT" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "galleryItemBaseId" INTEGER NOT NULL,
    "symbol" TEXT NOT NULL,
    "nftAppType" "NFTAppType" NOT NULL DEFAULT 'PERSENT',

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poap" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT,
    "poapEventId" INTEGER NOT NULL,
    "galleryItemBaseId" INTEGER NOT NULL,

    CONSTRAINT "Poap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ethAddress_key" ON "User"("ethAddress");

-- CreateIndex
CREATE UNIQUE INDEX "SBTSignatureRecord_id_key" ON "SBTSignatureRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SBTSignatureRecord_signaturePayloadId_key" ON "SBTSignatureRecord"("signaturePayloadId");

-- CreateIndex
CREATE UNIQUE INDEX "SignaturePayload_id_key" ON "SignaturePayload"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SBTContractType_galleryItemBaseId_key" ON "SBTContractType"("galleryItemBaseId");

-- CreateIndex
CREATE UNIQUE INDEX "NFTDeliveryData_id_key" ON "NFTDeliveryData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NFT_galleryItemBaseId_key" ON "NFT"("galleryItemBaseId");

-- CreateIndex
CREATE UNIQUE INDEX "Poap_galleryItemBaseId_key" ON "Poap"("galleryItemBaseId");

-- AddForeignKey
ALTER TABLE "RawExpressMessage" ADD CONSTRAINT "RawExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_id_fkey" FOREIGN KEY ("id") REFERENCES "RawExpressMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_contentType_fkey" FOREIGN KEY ("contentType") REFERENCES "ContentCategory"("contentType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MetaData" ADD CONSTRAINT "MetaData_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "ExpressMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_id_fkey" FOREIGN KEY ("id") REFERENCES "ExpressMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_sbtContractTypeId_fkey" FOREIGN KEY ("sbtContractTypeId") REFERENCES "SBTContractType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_signaturePayloadId_fkey" FOREIGN KEY ("signaturePayloadId") REFERENCES "SignaturePayload"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignaturePayload" ADD CONSTRAINT "SignaturePayload_id_fkey" FOREIGN KEY ("id") REFERENCES "ExpressMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTContractType" ADD CONSTRAINT "SBTContractType_galleryItemBaseId_fkey" FOREIGN KEY ("galleryItemBaseId") REFERENCES "GalleryItemBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFTDeliveryData" ADD CONSTRAINT "NFTDeliveryData_id_fkey" FOREIGN KEY ("id") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NFT" ADD CONSTRAINT "NFT_galleryItemBaseId_fkey" FOREIGN KEY ("galleryItemBaseId") REFERENCES "GalleryItemBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Poap" ADD CONSTRAINT "Poap_galleryItemBaseId_fkey" FOREIGN KEY ("galleryItemBaseId") REFERENCES "GalleryItemBase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
