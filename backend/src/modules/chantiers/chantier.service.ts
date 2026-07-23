import { ChantiersRepository } from "./chantier.repository";
import { CreateChantierDTO, UpdateChantierDTO } from "./chantier.dto";


export class ChantiersService {

    private repository = new ChantiersRepository();

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

}