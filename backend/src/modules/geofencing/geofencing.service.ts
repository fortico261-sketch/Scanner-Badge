export class GeofencingService {

    private readonly EARTH_RADIUS = 6371000;

    private toRadians(value: number): number {
        return value * Math.PI / 180;
    }

    //distance haversin
    calculateDistance( lat1: number, lon1: number, lat2: number, lon2: number): number {

        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(this.toRadians(lat1)) *
            Math.cos(this.toRadians(lat2)) *
            Math.sin(dLon / 2) ** 2;

        const c = 2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );

        return this.EARTH_RADIUS * c;
    }

    isInsideZone(employeeLat: number, employeeLon: number, chantierLat: number,chantierLon: number, radius: number ): boolean {

        const distance = this.calculateDistance(
            employeeLat,
            employeeLon,
            chantierLat,
            chantierLon
        );

        return distance <= radius;
    }
}