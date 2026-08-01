/*
  Warnings:

  - You are about to drop the column `badgeId` on the `employes` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "employes_badgeId_key";

-- AlterTable
ALTER TABLE "employes" DROP COLUMN "badgeId";

-- CreateTable
CREATE TABLE "badges" (
    "id" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "actif" BOOLEAN NOT NULL DEFAULT true,
    "employeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "badges_uid_key" ON "badges"("uid");

-- CreateIndex
CREATE UNIQUE INDEX "badges_employeId_key" ON "badges"("employeId");

-- AddForeignKey
ALTER TABLE "badges" ADD CONSTRAINT "badges_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
