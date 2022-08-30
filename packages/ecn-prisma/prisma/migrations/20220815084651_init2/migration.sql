/*
  Warnings:

  - You are about to drop the column `SignatureData` on the `SBTSignatureRecord` table. All the data in the column will be lost.
  - Added the required column `signatureData` to the `SBTSignatureRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SBTSignatureRecord" DROP COLUMN "SignatureData",
ADD COLUMN     "signatureData" TEXT NOT NULL;
