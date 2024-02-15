/*
  Warnings:

  - You are about to drop the column `email` on the `Expense` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Expense_email_key";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "email";
