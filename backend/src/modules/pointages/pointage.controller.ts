
import { PointageService } from "./pointage.service";
import { Request, Response } from "express";

export class PointageController {

    private service = new PointageService();

    async getAll(req: Request, res: Response) {
        try {
            const employeId = Array.isArray(req.query.employeId) ? req.query.employeId[0] : req.query.employeId;
            const dateDebut = Array.isArray(req.query.dateDebut) ? req.query.dateDebut[0] : req.query.dateDebut;
            const dateFin = Array.isArray(req.query.dateFin) ? req.query.dateFin[0] : req.query.dateFin;

            const pointages = await this.service.getWithFiltres(
                typeof employeId === 'string' ? employeId : undefined,
                typeof dateDebut === 'string' ? dateDebut : undefined,
                typeof dateFin === 'string' ? dateFin : undefined
            );

            res.status(200).json(pointages);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (typeof id !== "string") {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            const pointage = await this.service.getById(id);

            res.status(200).json(pointage);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async create(req: Request, res: Response) {
        console.log(req.body);

        try {
            const pointage = await this.service.create(req.body);

            res.status(200).json(pointage);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (typeof id !== "string") {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            const pointage = await this.service.update(
                id,
                req.body
            );

            res.status(200).json(pointage);

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;

            if (typeof id !== "string") {
                return res.status(400).json({
                    message: "ID invalide"
                });
            }

            await this.service.delete(id);

            res.status(200).json({
                message: "Pointage supprimé"
            });

        } catch (error: any) {
            res.status(400).json({
                message: error.message
            });
        }
    }
}

