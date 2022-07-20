-- CreateTable
CREATE TABLE "RawExpressMessage" (
    "id" SERIAL NOT NULL,
    "rawMessage" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parsedUrl" TEXT NOT NULL,
    "parsedMessage" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "RawExpressMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpressMessage" (
    "id" SERIAL NOT NULL,
    "rawMessageId" INTEGER NOT NULL,
    "expressUrl" TEXT NOT NULL,
    "expressMessage" TEXT NOT NULL,
    "verifiedAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "contentId" INTEGER NOT NULL,

    CONSTRAINT "ExpressMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ethAddress" TEXT,
    "ExpressCount" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "ContentCategory" (
    "id" SERIAL NOT NULL,
    "contentType" TEXT NOT NULL,

    CONSTRAINT "ContentCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SBTSignatureRecord" (
    "userId" TEXT NOT NULL,
    "expressMessageId" INTEGER NOT NULL,
    "signData" TEXT NOT NULL,
    "sbtContractTypeId" INTEGER NOT NULL,
    "signaturePayloadId" INTEGER NOT NULL,
    "SignatureData" TEXT NOT NULL,

    CONSTRAINT "SBTSignatureRecord_pkey" PRIMARY KEY ("userId","expressMessageId")
);

-- CreateTable
CREATE TABLE "SBTContractType" (
    "id" SERIAL NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countLevel" INTEGER[],
    "chainId" INTEGER NOT NULL,

    CONSTRAINT "SBTContractType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SignaturePayload" (
    "id" SERIAL NOT NULL,
    "metaDataIpfsUrl" TEXT NOT NULL,
    "receiverETHAddress" TEXT NOT NULL,
    "ExpressCount" INTEGER NOT NULL,

    CONSTRAINT "SignaturePayload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpressMessage_rawMessageId_key" ON "ExpressMessage"("rawMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "SBTSignatureRecord_expressMessageId_key" ON "SBTSignatureRecord"("expressMessageId");

-- CreateIndex
CREATE UNIQUE INDEX "SBTSignatureRecord_signaturePayloadId_key" ON "SBTSignatureRecord"("signaturePayloadId");

-- AddForeignKey
ALTER TABLE "RawExpressMessage" ADD CONSTRAINT "RawExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_rawMessageId_fkey" FOREIGN KEY ("rawMessageId") REFERENCES "RawExpressMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "ContentCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_expressMessageId_fkey" FOREIGN KEY ("expressMessageId") REFERENCES "ExpressMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_sbtContractTypeId_fkey" FOREIGN KEY ("sbtContractTypeId") REFERENCES "SBTContractType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_signaturePayloadId_fkey" FOREIGN KEY ("signaturePayloadId") REFERENCES "SignaturePayload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
