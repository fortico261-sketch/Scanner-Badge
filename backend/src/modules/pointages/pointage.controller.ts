import { Request, Response } from "express";
import { PointagesService } from "./pointage.service";

export class PointageController {
    constructor(private readonly pointagesService: PointagesService) {}

    async getAll(req: Request, res: Response) {
        try {
            const pointages = await this.pointagesService.fetchAll();
            res.status(200).json(pointages);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la recuperation des pointages",
                error,
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id as string;
            const pointage = await this.pointagesService.getById(id);

            if (!pointage) res.status(404).json({ message: "Pointage introuvable" });
            else res.status(200).json(pointage);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur lors de la recuperation du pointage", error });
        }
    }
}
