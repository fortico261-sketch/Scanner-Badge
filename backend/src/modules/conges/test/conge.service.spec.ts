import { CongeService } from "../conge.service";
import { CongesRepository } from "../conges.repository";

jest.mock("../conges.repository");

describe("CongeService", () => {

    let service: CongeService;
    let repository: jest.Mocked<CongesRepository>;

    beforeEach(() => {
        jest.clearAllMocks();

        service = new CongeService();

        repository =
            (service as any).repository;
    });


    describe("create", () => {

        it("doit créer un congé valide", async () => {

            const employeId = "emp-1";

            const dateDebut = new Date("2026-08-10");
            const dateFin = new Date("2026-08-12");

            repository.findEmployeById.mockResolvedValue({
                id: employeId
            } as any);

            repository.findOveralapping.mockResolvedValue(null);

            repository.create.mockResolvedValue({
                id: "conge-1",
                employeId,
                dateDebut,
                dateFin,
                createdAt: new Date()
            } as any);

            const result = await service.create({
                employeId,
                dateDebut,
                dateFin
            });

            expect(result.id).toBe("conge-1");

            expect(repository.create).toHaveBeenCalledWith({
                employeId,
                dateDebut,
                dateFin
            });
        });


        it("doit refuser si l'employé n'existe pas", async () => {

            repository.findEmployeById.mockResolvedValue(null);

            await expect(
                service.create({
                    employeId: "emp-inexistant",
                    dateDebut: new Date("2026-08-10"),
                    dateFin: new Date("2026-08-12")
                })
            ).rejects.toThrow("Employé introuvable");

            expect(repository.create).not.toHaveBeenCalled();
        });


        it("doit refuser si la date de début est après la date de fin", async () => {

            repository.findEmployeById.mockResolvedValue({
                id: "emp-1"
            } as any);

            await expect(
                service.create({
                    employeId: "emp-1",
                    dateDebut: new Date("2026-08-15"),
                    dateFin: new Date("2026-08-10")
                })
            ).rejects.toThrow(
                "La date de début doit être antérieure ou égale à la date de fin"
            );

            expect(repository.create).not.toHaveBeenCalled();
        });


        it("doit refuser un congé qui chevauche un autre congé", async () => {

            repository.findEmployeById.mockResolvedValue({
                id: "emp-1"
            } as any);

            repository.findOveralapping.mockResolvedValue({
                id: "conge-existant"
            } as any);

            await expect(
                service.create({
                    employeId: "emp-1",
                    dateDebut: new Date("2026-08-10"),
                    dateFin: new Date("2026-08-12")
                })
            ).rejects.toThrow(
                "Un congé existe déjà sur cette période"
            );

            expect(repository.create).not.toHaveBeenCalled();
        });

    });


    describe("getById", () => {

        it("doit retourner un congé existant", async () => {

            repository.findById.mockResolvedValue({
                id: "conge-1",
                employeId: "emp-1"
            } as any);

            const result = await service.getById("conge-1");

            expect(result.id).toBe("conge-1");

            expect(repository.findById)
                .toHaveBeenCalledWith("conge-1");
        });


        it("doit lever une erreur si le congé n'existe pas", async () => {

            repository.findById.mockResolvedValue(null);

            await expect(
                service.getById("conge-inexistant")
            ).rejects.toThrow("conge Introuvabe");
        });

    });


    describe("delete", () => {

        it("doit supprimer un congé existant", async () => {

            repository.findById.mockResolvedValue({
                id: "conge-1"
            } as any);

            repository.delete.mockResolvedValue({
                id: "conge-1"
            } as any);

            await service.delete("conge-1");

            expect(repository.delete)
                .toHaveBeenCalledWith("conge-1");
        });

    });

});