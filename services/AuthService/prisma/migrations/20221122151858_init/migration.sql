-- AlterTable
ALTER TABLE "User" ADD COLUMN     "verifiedAt" TIMESTAMP(3),
ADD COLUMN     "verifyToken" TEXT;
