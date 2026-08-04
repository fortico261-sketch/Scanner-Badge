import { PointageRepository } from "./pointage.repository"
import { CreatePointageDTO, UpdatePointageDTO } from "./pointage.dto"

export class PointageService {

    private repository = new PointageRepository();

    async getAll() {

        return this.repository.findAll();

    }
    

    async getById(id: string) {

        const pointage = await this.repository.findById(id);
        
        if(!pointage){
            throw new Error('Pointage introuvable')
        }
            
        return pointage;

    }


    async create(data: CreatePointageDTO) {

        return this.repository.create(data);

    }


    async update(id: string, data: UpdatePointageDTO) {

        const pointage = await this.repository.findById(id);

        if(!pointage) {
            throw new Error('Pointage introuvable');
        }

        return this.repository.update(id, data);

    }


    async delete(id: string) {

        const pointage = await this.repository.findById(id);

        if(!pointage) {
            throw new Error('Pointage introuvable');
        }

        return this.repository.delete(id);

    }


    async getWithFiltres( employeId?:string, datedebut?: string, datefin?: string) {

        return this.repository.findWithFilters(employeId, datedebut, datefin);

    }


}