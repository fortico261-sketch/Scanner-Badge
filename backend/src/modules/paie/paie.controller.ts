import { Request, Response } from "express";
import { PaieService } from "./paie.service";

export class PaieController {

    private service = new PaieService();


    async calculerPaie(req: Request, res: Response) {

        try {

            const employeId = String(req.params.employeId);

            const { dateDebut, dateFin } = req.query;

            if (!dateDebut || !dateFin) {
                return res.status(400).json({ message: "Les paramètres dateDebut et dateFin sont obligatoires" });
            }

            const debut = new Date(String(dateDebut));
            const fin = new Date(String(dateFin));

            if (isNaN(debut.getTime()) || isNaN(fin.getTime())) {
                return res.status(400).json({ message: "Les dates fournies sont invalides" });
            }

            if (debut > fin) {
                return res.status(400).json({ message: "La date de début doit être antérieure ou égale à la date de fin" });
            }

            const paie = await this.service.calculerPaie( employeId, debut, fin );

            return res.status(200).json(paie);

        } catch (error: any) {

            if (error.message === "Employé introuvable") {
                return res.status(404).json({ message: error.message });
            }

            return res.status(500).json({ message: "Erreur lors du calcul de la paie" });
        }
    }
}
