-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "coords" INTEGER[] DEFAULT ARRAY[0, 0]::INTEGER[];
