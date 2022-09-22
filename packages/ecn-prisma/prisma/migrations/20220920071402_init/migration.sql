/*
  Warnings:

  - You are about to drop the column `imageLink` on the `SBTContractType` table. All the data in the column will be lost.
  - You are about to drop the column `imageLink` on the `nft` table. All the data in the column will be lost.
  - You are about to drop the column `imageLink` on the `poap` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SBTContractType" DROP COLUMN "imageLink",
ADD COLUMN     "imageLinks" TEXT[],
ADD COLUMN     "videoLinks" TEXT[];

-- AlterTable
ALTER TABLE "nft" DROP COLUMN "imageLink",
ADD COLUMN     "imageLinks" TEXT[],
ADD COLUMN     "videoLinks" TEXT[];

-- AlterTable
ALTER TABLE "poap" DROP COLUMN "imageLink",
ADD COLUMN     "imageLinks" TEXT[],
ADD COLUMN     "videoLinks" TEXT[];
