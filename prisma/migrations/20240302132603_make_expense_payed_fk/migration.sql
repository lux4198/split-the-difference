/*
  Warnings:

  - You are about to drop the `_MemberExpensesPayed` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `payedBy` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MemberExpensesPayed" DROP CONSTRAINT "_MemberExpensesPayed_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberExpensesPayed" DROP CONSTRAINT "_MemberExpensesPayed_B_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "payedBy" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_MemberExpensesPayed";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_payedBy_fkey" FOREIGN KEY ("payedBy") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
