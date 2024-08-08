/*
  Warnings:

  - Added the required column `accessToken` to the `Runner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Runner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phNumber` to the `Runner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `Runner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Runner" ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "expiresAt" INTEGER NOT NULL,
ADD COLUMN     "phNumber" TEXT NOT NULL,
ADD COLUMN     "refreshToken" TEXT NOT NULL;
