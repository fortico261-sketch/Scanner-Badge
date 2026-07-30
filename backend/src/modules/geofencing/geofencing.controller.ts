import { GeofencingService } from "./geofencing.service";
import { Request, Response } from "express";

export class GeofencingController {

    private service = new GeofencingService();

    check = (req: Request, res: Response) => {

        const { employeLat, employeLon, chantierLat, chantierLon, radius } = req.body;

        const distance = this.service.calculateDistance(
            employeLat,
            employeLon,
            chantierLat,
            chantierLon
        );

        const inside = distance <= radius;

        res.status(200).json({
            distance,
            inside
        });
    };
}