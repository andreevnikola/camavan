/*
  Warnings:

  - You are about to drop the column `target_groups` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "target_groups";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "category";

-- DropEnum
DROP TYPE "Category";
