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
CREATE TABLE "User" (
    "discordId" TEXT NOT NULL,
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
    "SignatureData" TEXT NOT NULL,

    CONSTRAINT "SBTSignatureRecord_pkey" PRIMARY KEY ("id")
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
    "metadataURI" TEXT NOT NULL,
    "receiverETHAddress" TEXT NOT NULL,
    "expressCount" INTEGER NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "SignaturePayload_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_ethAddress_key" ON "User"("ethAddress");

-- CreateIndex
CREATE UNIQUE INDEX "SBTSignatureRecord_id_key" ON "SBTSignatureRecord"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SBTSignatureRecord_signaturePayloadId_key" ON "SBTSignatureRecord"("signaturePayloadId");

-- CreateIndex
CREATE UNIQUE INDEX "SignaturePayload_id_key" ON "SignaturePayload"("id");

-- AddForeignKey
ALTER TABLE "RawExpressMessage" ADD CONSTRAINT "RawExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_id_fkey" FOREIGN KEY ("id") REFERENCES "RawExpressMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpressMessage" ADD CONSTRAINT "ExpressMessage_contentType_fkey" FOREIGN KEY ("contentType") REFERENCES "ContentCategory"("contentType") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_id_fkey" FOREIGN KEY ("id") REFERENCES "ExpressMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_sbtContractTypeId_fkey" FOREIGN KEY ("sbtContractTypeId") REFERENCES "SBTContractType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SBTSignatureRecord" ADD CONSTRAINT "SBTSignatureRecord_signaturePayloadId_fkey" FOREIGN KEY ("signaturePayloadId") REFERENCES "SignaturePayload"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SignaturePayload" ADD CONSTRAINT "SignaturePayload_id_fkey" FOREIGN KEY ("id") REFERENCES "ExpressMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
