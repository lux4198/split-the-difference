/*
  Warnings:

  - Added the required column `email` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "email" VARCHAR(100) NOT NULL,
ADD COLUMN     "password" VARCHAR(100) NOT NULL;
