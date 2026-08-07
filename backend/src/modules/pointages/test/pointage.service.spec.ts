import { PointageService } from "../pointage.service";


describe("PointageService - create", () => {

    let service: PointageService;


    beforeEach(() => {

        service = new PointageService();


        // Mock PointageRepository
        (service as any).repository = {

            findLastByEmploye: jest.fn(),

            create: jest.fn((data) => ({
                id: "pointage-1",
                ...data
            }))

        };


        // Mock EmployeRepository
        (service as any).employeRepository = {

            findById: jest.fn().mockResolvedValue({

                id: "emp-1",

                chantierId: "chantier-1",

                badge: {
                    uid: "badge-001",
                    actif: true
                }

            })

        };


        // Mock ChantierRepository
        (service as any).chantierRepository = {

            findById: jest.fn().mockResolvedValue({

                id: "chantier-1",

                latitude: -18.91,

                longitude: 47.52,

                rayonToleranceM: 100

            })

        };


        // Mock GeofencingService
        (service as any).geofencingService = {

            isInsideZone: jest.fn()
                .mockReturnValue(true)

        };

    });



    test("doit accepter une entrée sans historique", async () => {


        (service as any).repository.findLastByEmploye
            .mockResolvedValue(null);


        const result = await service.create({

            employeId: "emp-1",

            chantierId: "chantier-1",

            latitude: -18.91,

            longitude: 47.52,

            satellites: 8,

            status: "ENTREE"

        });


        expect(result.status)
            .toBe("ENTREE");


        expect(
            (service as any).repository.create
        )
        .toHaveBeenCalled();


    });



    test("doit refuser une sortie sans entrée précédente", async () => {


        (service as any).repository.findLastByEmploye
            .mockResolvedValue(null);



        await expect(

            service.create({

                employeId:"emp-1",

                chantierId:"chantier-1",

                latitude:-18.91,

                longitude:47.52,

                satellites:8,

                status:"SORTIE"

            })

        )
        .rejects
        .toThrow(
            "Impossible de faire une sortie sans entrée active"
        );


    });



    test("doit refuser une double entrée", async () => {


        (service as any).repository.findLastByEmploye
            .mockResolvedValue({

                status:"ENTREE"

            });



        await expect(

            service.create({

                employeId:"emp-1",

                chantierId:"chantier-1",

                status:"ENTREE"

            })

        )
        .rejects
        .toThrow(
            "L'employé est déjà présent"
        );


    });



    test("doit accepter une sortie après une entrée", async () => {


        (service as any).repository.findLastByEmploye
            .mockResolvedValue({

                status:"ENTREE"

            });



        const result = await service.create({

            employeId:"emp-1",

            chantierId:"chantier-1",

            status:"SORTIE"

        });



        expect(result.status)
            .toBe("SORTIE");


    });



});