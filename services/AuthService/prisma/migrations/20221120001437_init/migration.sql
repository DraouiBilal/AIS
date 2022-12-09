/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `History` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" ADD COLUMN     "ownerId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "History_ownerId_key" ON "History"("ownerId");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
