import { Request, Response } from "express";
import { CongeService } from "./conge.service";

export class CongeController {

    private service = new CongeService()

    async getAll(req: Request, res: Response) {
        try {
            const conges = await this.service.getAll()
            
            return res.status(200).json(conges)

        } catch (error) {
            res.status(500).json({message: "erreur lor de la recuperation des conges"})
        }
    }


    async getById(req: Request, res: Response) {
        try {
            const conge = await this.service.getById(String(req.params.id))

            return res.status(200).json(conge)

        } catch (error : any) {
            res.status(404).json({message: error.message})            
        }
    }


    async getByEmployeId(req: Request, res: Response) {
        try {
            const conges = await this.service.getByEmployeId(String(req.params.employeId))
         return res.status(200).json(conges);

        } catch (error) {
            return res.status(500).json({ message: "Erreur lors de la récupération des congés" });
        }
    }


    async create(req: Request, res: Response) {
        try {
            const { employeId, dateDebut, dateFin } = req.body
            const conge = await this.service.create({ employeId, dateDebut: new Date(dateDebut), dateFin: new Date(dateFin) })

            return res.status(201).json(conge)

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
            
        }
    }


    async update(req: Request, res: Response) {
        try {
            const data: any = {};

            if (req.body.dateDebut) {
                data.dateDebut = new Date(req.body.dateDebut);
            }

            if (req.body.dateFin) {
                data.dateFin = new Date(req.body.dateFin);
            }

            const conge = await this.service.update(String(req.params.id), data);

            return res.status(200).json(conge);

        } catch (error: any) {
            return res.status(400).json({ message: error.message });
        }
    }


    async delete(req: Request, res: Response) {
        try {
            await this.service.delete(String(req.params.id));

            return res.status(204).send();

        } catch (error: any) {
            return res.status(404).json({
                message: error.message
            });
        }
    }


}
