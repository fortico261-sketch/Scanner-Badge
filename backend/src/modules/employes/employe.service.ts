import { EmployeRepository } from "./employe.repository";
import { CreateEmployeDTO, UpdateEmployeDTO } from "./employe.dto";
import type { LocationPoint } from "../pointages/pointage.dto";
import type { ChantiersService } from "../chantiers/chantier.service";

export class EmployeService {
    constructor(
        private repository: EmployeRepository,
        private chantiersService: ChantiersService,
    ) {}

    async getAll() {
        return this.repository.findAll();
    }

    async getByid(id: String) {
        return this.repository.findById(id);
    }

    async getBadgeId(badgeId: string) {
        return this.repository.findBadgeId(badgeId);
    }

    async create(data: CreateEmployeDTO) {
        return this.repository.create(data);
    }

    async update(id: String, data: UpdateEmployeDTO) {
        return this.repository.update(id, data);
    }

    async delete(id: String) {
        return this.repository.delete(id);
    }

    async checkEmployeInsideChantierZone(badgeId: string, point: LocationPoint) {
        const employe = await this.getBadgeId(badgeId);
        if (!employe) throw Error("Employe not found with this badgeId");

        const inside = await this.chantiersService.checkPointInsideChantierZone(
            employe.chantierId,
            point,
        );
        return { inside, employeId: employe.id };
    }
}
