import { PointageService } from "./pointage.service"
import { Request, Response } from "express";

export class PointageController {

    private service = new PointageService();

    async getAll(req: Request, res: Response) {
        try {

            const { employeId, dateDebut, dateFin } = req.query;

            const pointages = await this.service.getWithFiltres(employeId as string, dateDebut as string, dateFin as string);
           
            res.status(200).json(pointages);

        } catch (error: any) {
            res.status(400).json({ message: error.message});
        }
    }

    async getById(req: Request, res: Response) {
        try {

            const  id  = req.params.id;
            const pointage = await this.service.getById(id);
           
            res.status(200).json(pointage);

        }catch(error: any) {
            res.status(400).json({message: error.message});
        }
    }

    async create(req: Request, res: Response) {
        console.log(req.body)
        
        try {

            const pointage = await this.service.create(req.body)
            res.status(200).json(pointage)

        }catch (error : any) {

            res.status(400).json({message: error.message});

        }

    }

     async update(req: Request, res: Response) {

        try {

            const pointage = await this.service.update(req.params.id, req.body);

            res.status(200).json(pointage);

        } catch (error: any) {

            res.status(400).json({ message: error.message});

        }
    }

    async delete(req: Request, res: Response) {

        try {

            const id = req.params.id;

            await this.service.delete(id);

            res.status(200).json({ message: "Pointage supprimé" });

        } catch (error: any) {

            res.status(400).json({message: error.message });

        }
    }
}
