import { GeofencingService } from "../geofencing.service";

describe("GeofencingService", () => {

    const service = new GeofencingService();

    it("should return true when distance is inside radius", () => {

        expect( service.isInsideZone(
                48.8566, // employé
                2.3522,

                48.8567, // chantier très proche
                2.3523,

                100      // rayon 100 m
            )
        ).toBe(true);

    });

    it("should return false whene distance is outside radius", () => {
        expect( service.isInsideZone(
            //position employe
            100.8566,
            2.3522,

            // position chantier
            48.8567,
            2.3523,

            // rayon
            100
        )).toBe(false);
    })

    it("should return true when distance is exactly equal to radius", () => {
        const distance = service.calculateDistance(
             48.8566,
            2.3522,

            48.8575,
            2.3531,
        )
        expect( service.isInsideZone(
            //position employe
            48.8566,
            2.3522,
            // position chantier
            48.8575,
            2.3531,
            
            // rayon
            distance
        )).toBe(true);
    })

});