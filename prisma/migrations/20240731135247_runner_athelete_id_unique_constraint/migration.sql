/*
  Warnings:

  - You are about to alter the column `athelete_id` on the `Runner` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - A unique constraint covering the columns `[athelete_id]` on the table `Runner` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Runner" ALTER COLUMN "athelete_id" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Runner_athelete_id_key" ON "Runner"("athelete_id");
