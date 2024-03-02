-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "currency" VARCHAR(3) NOT NULL DEFAULT 'EUR';
