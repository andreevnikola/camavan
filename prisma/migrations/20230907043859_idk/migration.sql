/*
  Warnings:

  - Added the required column `userId` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
