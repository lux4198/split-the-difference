/*
  Warnings:

  - You are about to drop the `_MemberExpenses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MemberExpenses" DROP CONSTRAINT "_MemberExpenses_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberExpenses" DROP CONSTRAINT "_MemberExpenses_B_fkey";

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_MemberExpenses";

-- DropTable
DROP TABLE "test";

-- CreateTable
CREATE TABLE "_MemberExpensesPayed" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_MemberExpensesShared" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MemberExpensesPayed_AB_unique" ON "_MemberExpensesPayed"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberExpensesPayed_B_index" ON "_MemberExpensesPayed"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MemberExpensesShared_AB_unique" ON "_MemberExpensesShared"("A", "B");

-- CreateIndex
CREATE INDEX "_MemberExpensesShared_B_index" ON "_MemberExpensesShared"("B");

-- AddForeignKey
ALTER TABLE "_MemberExpensesPayed" ADD CONSTRAINT "_MemberExpensesPayed_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberExpensesPayed" ADD CONSTRAINT "_MemberExpensesPayed_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberExpensesShared" ADD CONSTRAINT "_MemberExpensesShared_A_fkey" FOREIGN KEY ("A") REFERENCES "Expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MemberExpensesShared" ADD CONSTRAINT "_MemberExpensesShared_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
