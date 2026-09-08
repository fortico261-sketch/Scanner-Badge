import { PaieService } from "../paie.service";
import { PaieRepository } from "../paie.repository";

describe("PaieService", () => {

    let service: PaieService;
    let repository: jest.Mocked<PaieRepository>;

    beforeEach(() => {

        repository = {
            findEmployeWithData: jest.fn()
        } as unknown as jest.Mocked<PaieRepository>;

        service = new PaieService(repository);
    });


    describe("calculerPaie", () => {

        it("doit calculer correctement le salaire avec heures normales", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,
                volumeMensuelObligatoire: 160,

                pointages: [
                    {
                        status: "ENTREE",
                        timestamp: new Date("2026-08-03T08:00:00")
                    },
                    {
                        status: "SORTIE",
                        timestamp: new Date("2026-08-03T16:00:00")
                    }
                ],

                conges: []
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.employeId).toBe("emp-1");
            expect(result.nom).toBe("Rakoto");
            expect(result.prenom).toBe("Jean");

            expect(result.tauxHoraire).toBe(5000);

            expect(result.heuresTravaillees).toBe(8);
            expect(result.heuresSupplementaires).toBe(0);
            expect(result.heuresCongesPayes).toBe(0);

            expect(result.heuresAbsenceNonJustifiee).toBe(152);

            expect(result.salaireHeuresTravaillees).toBe(40000);
            expect(result.salaireCongesPayes).toBe(0);
            expect(result.bonusHeuresSupplementaires).toBe(0);

            expect(result.penalites).toBe(760000);

            expect(result.salaireTotal).toBe(-720000);
        });


        it("doit calculer les congés payés", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,
                volumeMensuelObligatoire: 160,

                pointages: [],

                conges: [
                    {
                        dateDebut: new Date("2026-08-10"),
                        dateFin: new Date("2026-08-11")
                    }
                ]
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.joursCongesPayes).toBe(2);

            expect(result.heuresCongesPayes).toBe(16);

            expect(result.salaireCongesPayes).toBe(80000);

            expect(result.heuresAbsenceNonJustifiee).toBe(144);

            expect(result.penalites).toBe(720000);

            expect(result.salaireTotal).toBe(-640000);
        });


        it("doit calculer les heures supplémentaires", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,

                volumeMensuelObligatoire: 8,

                pointages: [
                    {
                        status: "ENTREE",
                        timestamp: new Date("2026-08-03T08:00:00")
                    },
                    {
                        status: "SORTIE",
                        timestamp: new Date("2026-08-03T20:00:00")
                    }
                ],

                conges: []
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.heuresTravaillees).toBe(12);

            expect(result.heuresSupplementaires).toBe(4);

            expect(result.salaireHeuresTravaillees).toBe(40000);

            expect(result.bonusHeuresSupplementaires).toBe(25000);

            expect(result.heuresAbsenceNonJustifiee).toBe(0);

            expect(result.penalites).toBe(0);

            expect(result.salaireTotal).toBe(65000);
        });


        it("doit refuser si l'employé n'existe pas", async () => {

            repository.findEmployeWithData.mockResolvedValue(null);

            await expect(
                service.calculerPaie(
                    "employe-inexistant",
                    new Date("2026-08-01"),
                    new Date("2026-09-01")
                )
            ).rejects.toThrow("Employé introuvable");

            expect(
                repository.findEmployeWithData
            ).toHaveBeenCalledWith(
                "employe-inexistant",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );
        });


        it("doit calculer une absence non justifiée", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,

                volumeMensuelObligatoire: 160,

                pointages: [],

                conges: []
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.heuresTravaillees).toBe(0);

            expect(result.heuresCongesPayes).toBe(0);

            expect(result.heuresSupplementaires).toBe(0);

            expect(result.heuresAbsenceNonJustifiee).toBe(160);

            expect(result.penalites).toBe(800000);

            expect(result.salaireTotal).toBe(-800000);
        });


        it("doit gérer un congé qui chevauche partiellement la période de paie", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,

                volumeMensuelObligatoire: 160,

                pointages: [],

                conges: [
                    {
                        dateDebut: new Date("2026-07-30"),
                        dateFin: new Date("2026-08-03")
                    }
                ]
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.joursCongesPayes).toBe(3);

            expect(result.heuresCongesPayes).toBe(24);

            expect(result.salaireCongesPayes).toBe(120000);
        });


        it("ne doit pas dépasser le volume mensuel obligatoire pour les heures normales", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,

                volumeMensuelObligatoire: 160,

                pointages: [
                    {
                        status: "ENTREE",
                        timestamp: new Date("2026-08-01T08:00:00")
                    },
                    {
                        status: "SORTIE",
                        timestamp: new Date("2026-08-01T18:00:00")
                    }
                ],

                conges: []
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.heuresTravaillees).toBe(10);

            expect(result.heuresSupplementaires).toBe(0);

            expect(result.heuresAbsenceNonJustifiee).toBe(150);

            expect(result.salaireHeuresTravaillees).toBe(50000);
        });


        it("doit gérer plusieurs journées de pointage", async () => {

            const employe = {
                id: "emp-1",
                nom: "Rakoto",
                prenom: "Jean",
                tauxHoraire: 5000,

                volumeMensuelObligatoire: 16,

                pointages: [
                    {
                        status: "ENTREE",
                        timestamp: new Date("2026-08-01T08:00:00")
                    },
                    {
                        status: "SORTIE",
                        timestamp: new Date("2026-08-01T16:00:00")
                    },
                    {
                        status: "ENTREE",
                        timestamp: new Date("2026-08-02T08:00:00")
                    },
                    {
                        status: "SORTIE",
                        timestamp: new Date("2026-08-02T16:00:00")
                    }
                ],

                conges: []
            };

            repository.findEmployeWithData.mockResolvedValue(
                employe as any
            );

            const result = await service.calculerPaie(
                "emp-1",
                new Date("2026-08-01"),
                new Date("2026-09-01")
            );

            expect(result.heuresTravaillees).toBe(16);

            expect(result.heuresSupplementaires).toBe(0);

            expect(result.heuresAbsenceNonJustifiee).toBe(0);

            expect(result.salaireHeuresTravaillees).toBe(80000);

            expect(result.penalites).toBe(0);

            expect(result.salaireTotal).toBe(80000);
        });

    });

});
