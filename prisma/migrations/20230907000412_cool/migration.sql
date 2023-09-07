-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('ADULT', 'CHILD');

-- CreateEnum
CREATE TYPE "Workshops" AS ENUM ('ZORATA', 'THE_REVOLUTION', 'LATE', 'FAMILY');

-- CreateTable
CREATE TABLE "Tickets" (
    "id" TEXT NOT NULL,
    "type" "TicketType" NOT NULL DEFAULT 'ADULT',
    "eventId" TEXT NOT NULL,
    "workshop" "Workshops" NOT NULL DEFAULT 'FAMILY',

    CONSTRAINT "Tickets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Tickets" ADD CONSTRAINT "Tickets_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
