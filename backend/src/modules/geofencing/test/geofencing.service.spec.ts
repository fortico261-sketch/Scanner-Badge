import { GeofencingService } from "../geofencing.service";

describe("GeofencingService", () => {

    const service = new GeofencingService();

    it("should return true when distance is inside radius", () => {

        expect(
            service.isInsideZone(
                48.8566, // employé
                2.3522,
                48.8567, // chantier très proche
                2.3523,
                100      // rayon 100 m
            )
        ).toBe(true);

    });

});