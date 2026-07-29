import { CreateChantierDTO, UpdateChantierDTO } from "./chantier.dto";
import type { LocationPoint } from "../pointages/pointage.dto";
import { calculateDistance } from "../../utils/formule.util";
import { ChantiersRepository } from "./chantier.repository";

export class ChantiersService {
    constructor(private readonly repository: ChantiersRepository) {}

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id: string) {
        return this.repository.findById(id);
    }

    async create(data: CreateChantierDTO) {
        return this.repository.create(data);
    }

    async update(id: string, data: UpdateChantierDTO) {
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        return this.repository.delete(id);
    }

    async checkPointInsideChantierZone(chantierId: string, point: LocationPoint) {
        const chantier = await this.getById(chantierId);
        if (!chantier) {
            throw new Error(`Chantier with ID ${chantierId} not found.`);
        }

        const distance = calculateDistance(point, {
            latitude: chantier.latitude,
            longitude: chantier.longitude,
        });

        return distance <= chantier.rayonToleranceM;
    }
}
