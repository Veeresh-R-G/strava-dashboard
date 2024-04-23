/*
  Warnings:

  - You are about to alter the column `total_kilometers` on the `Runner` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Runner" ALTER COLUMN "total_kilometers" SET DATA TYPE DECIMAL(10,2);
