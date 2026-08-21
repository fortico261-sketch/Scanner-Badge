import { CongesRepository } from "./conges.repository";
import { CreateCongeDto } from "./conges.dto";
import { UpdateCongeDto } from "./conges.dto";

export class CongeService {

    private repository = new CongesRepository();

    async getAll() {

        return this.repository.findall();

    }


    async getById(id: string) {

        const conge = await this.repository.findById(id);

        if(!conge) {
            throw new Error("conge Introuvabe")
        }

        return conge
    }


    async getByEmployeId(employeId : string) {

        return this.repository.findByEmployeId(employeId)

    }


    async create(data: CreateCongeDto) {

         const employe = await this.repository.findEmployeById( data.employeId );

        if (!employe) {
            throw new Error("Employé introuvable");
        }

        if(data.dateDebut > data.dateFin ) {
            throw new Error("La date de début doit être antérieure ou égale à la date de fin")
        }

        const chevauchement = await this.repository.findOveralapping(data.employeId, data.dateDebut, data.dateFin);

        if(chevauchement) {
            throw new Error("Un congé existe déjà sur cette période")
        }
        
        return this.repository.create(data)
    }


    async update(id: string, data: UpdateCongeDto) {

        const conge = await this.getById(id)
        const dateDebut = data.dateDebut ?? conge.dateDebut
        const dateFin = data.dateFin ?? conge.dateFin

        if (dateDebut > dateFin) {
            throw new Error( "La date de début doit être antérieure ou égale à la date de fin" );
        }

        const chevauchement = await this.repository.findOveralapping(conge.employeId, dateDebut, dateFin, id );

        if (chevauchement) {
            throw new Error("Un congé existe déjà sur cette période");
        }

        return this.repository.update(id, data);

    }


    async delete(id: string) {

        await this.getById(id)

        return this.repository.delete(id)

    }

}