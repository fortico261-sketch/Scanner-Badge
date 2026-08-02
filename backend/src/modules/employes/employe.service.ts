import { EmployeRepository }  from './employe.repository';
import { ChantiersService } from '../chantiers/chantier.service';
import { CreateEmployeDTO, UpdateEmployeDTO } from './employe.dto';

export class EmployeService {

    private repository = new EmployeRepository();
    private chantierService = new ChantiersService();

    async getAll() {
        return this.repository.findAll();
    }

    async getByid(id : string) {
        return this.repository.findById(id);
    }

    async getBadgeId(uid: string) {
        return this.repository.findBadgeId(uid);
    }

    async create(data: CreateEmployeDTO) {
        const chantier = await this.chantierService.getById(data.chantierId);
        if (!chantier) {
            throw new Error('chantier introuvable');
        }
        return this.repository.create(data);

    }

        async update(id: string, data: UpdateEmployeDTO) {
            if (data.chantierId) {
                const chantier = await this.chantierService.getById(data.chantierId);
            if (!chantier) {
                throw new Error('chantier introuvable');
            }
        }
        return this.repository.update(id, data);
    }

    async delete(id: string) {
        return this.repository.delete(id);
    }

}