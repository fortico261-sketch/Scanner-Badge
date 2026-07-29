import { EmployeRepository }  from './employe.repository';
import { CreateEmployeDTO, UpdateEmployeDTO } from './employe.dto';

export class EmployeService {

    private repository = new EmployeRepository();

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

}