/*
  Warnings:

  - Added the required column `userId` to the `RawExpressMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawExpressMessage" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RawExpressMessage" ADD CONSTRAINT "RawExpressMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;
