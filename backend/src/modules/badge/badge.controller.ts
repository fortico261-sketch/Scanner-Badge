import { BadgeService } from "./badge.service"
import { Request, Response } from "express"


export class BadgeController {

    private service = new BadgeService();

    asociate = async (req: Request, res: Response) => {
        try {
            const { uid, employeId } = req.body;

            const bagde = await this.service.asociateBadge(uid, employeId);

            res.status(201).json(bagde);

        } catch(error: any) {
            res.status(400).json({message: error.message})
        }

    }

    findEmploye = async (req: Request, res: Response) => {
        try {

            const { uid } = req.params;

            const employe = await this.service.getEmployeByBafge(uid as string);

            res.status(200).json(employe);

        } catch (error: any) {
            res.status(404).json({message:error.message});
            
        }
    }
} 