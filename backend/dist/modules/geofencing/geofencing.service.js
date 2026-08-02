"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeofencingService = void 0;
class GeofencingService {
    constructor() {
        this.EARTH_RADIUS = 6371000;
    }
    toRadians(value) {
        return value * Math.PI / 180;
    }
    //distance haversin
    calculateDistance(lat1, lon1, lat2, lon2) {
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(this.toRadians(lat1)) *
                Math.cos(this.toRadians(lat2)) *
                Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return this.EARTH_RADIUS * c;
    }
    isInsideZone(employeeLat, employeeLon, chantierLat, chantierLon, radius) {
        const distance = this.calculateDistance(employeeLat, employeeLon, chantierLat, chantierLon);
        return distance <= radius;
    }
}
exports.GeofencingService = GeofencingService;
//# sourceMappingURL=geofencing.service.js.map