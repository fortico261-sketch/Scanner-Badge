import { LocationPoint } from "../modules/pointages/pointage.dto";

export function calculateDistance(point1: LocationPoint, point2: LocationPoint): number {
    const R = 6371000; // Rayon de la Terre en mètres

    const dLat = toRadians(point2.latitude - point1.latitude);
    const dLon = toRadians(point2.longitude - point1.longitude);

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRadians(point1.latitude)) *
            Math.cos(toRadians(point2.longitude)) *
            Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

const toRadians = (deg: number) => (deg * Math.PI) / 180;
