-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'CLIENT';

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "target_groups" "Category"[] DEFAULT ARRAY['UNKNOWN']::"Category"[],
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "markdown" TEXT,
    "image_url" TEXT,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3),
    "location" TEXT,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);
