"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeofencingController = void 0;
const geofencing_service_1 = require("./geofencing.service");
class GeofencingController {
    constructor() {
        this.service = new geofencing_service_1.GeofencingService();
        this.check = (req, res) => {
            const { employeLat, employeLon, chantierLat, chantierLon, radius } = req.body;
            const distance = this.service.calculateDistance(employeLat, employeLon, chantierLat, chantierLon);
            const inside = distance <= radius;
            res.status(200).json({
                distance,
                inside
            });
        };
    }
}
exports.GeofencingController = GeofencingController;
//# sourceMappingURL=geofencing.controller.js.map