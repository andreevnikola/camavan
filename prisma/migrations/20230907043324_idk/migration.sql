-- CreateEnum
CREATE TYPE "PaymentMehods" AS ENUM ('CASH', 'STRIPE');

-- AlterTable
ALTER TABLE "Tickets" ADD COLUMN     "paymentMethod" "PaymentMehods" NOT NULL DEFAULT 'CASH';
