/*
  Warnings:

  - You are about to drop the column `location` on the `Events` table. All the data in the column will be lost.
  - You are about to drop the column `markdown` on the `Events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "location",
DROP COLUMN "markdown",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "city" TEXT NOT NULL DEFAULT '';
