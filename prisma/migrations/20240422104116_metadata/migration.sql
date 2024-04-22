/*
  Warnings:

  - Added the required column `total_distance` to the `Metadata` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metadata" ADD COLUMN     "total_distance" DOUBLE PRECISION NOT NULL;
