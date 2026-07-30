import { StatutPointage } from "@prisma/client";
import type { EmployeService } from "../employes/employe.service";
import type { CreatePointageDto, PayloadPointage } from "./pointage.dto";
import type { PointagesRepository } from "./pointage.repository";

export class PointagesService {
    constructor(
        private readonly repository: PointagesRepository,
        private readonly employeService: EmployeService,
    ) {}

    async save(data: PayloadPointage) {
        try {
            const checkResult = await this.employeService.checkEmployeInsideChantierZone(
                data.uid,
                data.loc,
            );
            const lastPointage = await this.repository.lastPointageEmploye(checkResult.employeId);

            const statusValue =
                !lastPointage || lastPointage.status === StatutPointage.SORTIE
                    ? StatutPointage.ENTREE
                    : StatutPointage.SORTIE;

            const pointage: CreatePointageDto = {
                employeId: checkResult.employeId,
                ...data.loc,
                alertHorsZone: !checkResult.inside,
                timestamp: data.timestamp,
                status: statusValue,
            };
            await this.repository.create(pointage);
        } catch (error) {
            console.error("Erreur pendant la sauvegarde du pointage:", error);
        }
    }

    async fetchAll() {
        return await this.repository.findAll();
    }

    async getById(id: string) {
        return await this.repository.findById(id);
    }
}
