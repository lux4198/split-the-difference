/*
  Warnings:

  - You are about to drop the column `payedBy` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_payedBy_fkey";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "payedBy",
ADD COLUMN     "memberId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
