/*
  Warnings:

  - The `gallery` column on the `Events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Events" DROP COLUMN "gallery",
ADD COLUMN     "gallery" JSONB;
