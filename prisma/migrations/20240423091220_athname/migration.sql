/*
  Warnings:

  - A unique constraint covering the columns `[athelete_name]` on the table `Runner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Runner_athelete_name_key" ON "Runner"("athelete_name");
