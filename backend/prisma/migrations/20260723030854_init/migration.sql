-- CreateEnum
CREATE TYPE "StatutPointage" AS ENUM ('ENTREE', 'SORTIE');

-- CreateTable
CREATE TABLE "chantier" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "rayonToleranceM" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chantier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employes" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "badgeId" TEXT NOT NULL,
    "tauxHoraire" DECIMAL(10,2) NOT NULL,
    "volumeMensuelObligatoire" INTEGER NOT NULL,
    "chantierId" TEXT NOT NULL,

    CONSTRAINT "employes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pointage" (
    "id" TEXT NOT NULL,
    "employeId" TEXT NOT NULL,
    "chantierId" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "satellites" DOUBLE PRECISION,
    "alertHorsZone" BOOLEAN NOT NULL,
    "status" "StatutPointage" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pointage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employes_badgeId_key" ON "employes"("badgeId");

-- AddForeignKey
ALTER TABLE "employes" ADD CONSTRAINT "employes_chantierId_fkey" FOREIGN KEY ("chantierId") REFERENCES "chantier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointage" ADD CONSTRAINT "pointage_employeId_fkey" FOREIGN KEY ("employeId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pointage" ADD CONSTRAINT "pointage_chantierId_fkey" FOREIGN KEY ("chantierId") REFERENCES "chantier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
