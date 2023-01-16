/*
  Warnings:

  - The values [media] on the enum `urlType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `creator` on the `MetaData` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "urlType_new" AS ENUM ('twitter', 'video', 'ogData', 'onlyMeta', 'noMeta');
ALTER TABLE "MetaData" ALTER COLUMN "urlType" DROP DEFAULT;
ALTER TABLE "MetaData" ALTER COLUMN "urlType" TYPE "urlType_new" USING ("urlType"::text::"urlType_new");
ALTER TYPE "urlType" RENAME TO "urlType_old";
ALTER TYPE "urlType_new" RENAME TO "urlType";
DROP TYPE "urlType_old";
ALTER TABLE "MetaData" ALTER COLUMN "urlType" SET DEFAULT 'twitter';
COMMIT;

-- AlterTable
ALTER TABLE "MetaData" DROP COLUMN "creator",
ADD COLUMN     "twitterId" TEXT,
ALTER COLUMN "urlType" SET DEFAULT 'twitter';
