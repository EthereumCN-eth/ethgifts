/*
  Warnings:

  - Added the required column `chainId` to the `poap` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "poap" ADD COLUMN     "chainId" INTEGER NOT NULL;
