/*
  Warnings:

  - You are about to drop the column `avatar` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `fullname` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `History` table. All the data in the column will be lost.
  - Added the required column `filename` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "History_username_key";

-- AlterTable
ALTER TABLE "History" DROP COLUMN "avatar",
DROP COLUMN "fullname",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "filename" TEXT NOT NULL;
