/*
  Warnings:

  - You are about to drop the `History` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_ownerId_fkey";

-- DropTable
DROP TABLE "History";

-- DropEnum
DROP TYPE "Type";