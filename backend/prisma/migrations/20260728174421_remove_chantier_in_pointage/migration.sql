/*
  Warnings:

  - You are about to drop the column `chantierId` on the `pointage` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pointage" DROP CONSTRAINT "pointage_chantierId_fkey";

-- AlterTable
ALTER TABLE "pointage" DROP COLUMN "chantierId";
