import { ChantiersRepository } from "./chantier.repository";
import { CreateChantierDTO, UpdateChantierDTO } from "./chantier.dto";


export class ChantiersService {

    private repository = new ChantiersRepository();

    private async checkExist(chantierId: string) {

        const chantiers = await this.repository.findById(chantierId);

        if(!chantiers) {
            throw new Error('Chantier introuvable');
        }

        return chantiers;
    }

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id: string) {

       return await this.checkExist(id);

    }

    async create(data: CreateChantierDTO) {

        const chantier = await this.repository.create(data);
       
        return chantier;
    }

    async update(id: string, data: UpdateChantierDTO) {

        await this.checkExist(id);

        return this.repository.update(id, data);
    }

    async delete(id: string) {

        await this.checkExist(id);

        return this.repository.delete(id);
    }

}