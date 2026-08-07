import { PointageRepository } from "./pointage.repository"
import { EmployeRepository } from "../employes/employe.repository";
import { ChantiersRepository } from "../chantiers/chantier.repository";
import { GeofencingService } from "../geofencing/geofencing.service";
import { CreatePointageDTO, UpdatePointageDTO } from "./pointage.dto"

export class PointageService {

    private repository = new PointageRepository();
    private employeRepository = new EmployeRepository();
    private chantierRepository = new ChantiersRepository();
    private geofencingService = new GeofencingService();
   
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

        //verification employer
        const employe = await this.employeRepository.findById(data.employeId);

        if(!employe) {
            throw new Error('Employe introuvable');
        }

        //verification badge
        if(!employe.badge || !employe.badge.actif) {
            throw new Error('Badge invalide ou desactive');
        }

        //verification chantier
        const chantier = await this.chantierRepository.findById(data.chantierId);

        if(!chantier) {
            throw new Error('Chantier introuvable');
        }

        let alertHorsZone = false;

        if(data.latitude !== undefined && data.longitude !== undefined) {

           const dansLaZone = this.geofencingService.isInsideZone(
                data.latitude,
                data.longitude,
                chantier.latitude,
                chantier.longitude,
                chantier.rayonToleranceM
           )

           alertHorsZone = !dansLaZone;
        }

        //verificationaffectation
        if( employe.chantierId !== data.chantierId) {
            throw new Error("L'employe n'est pas affecté à ce chantier");
        }

        //verification transition status
        const dernier = await this.repository.findLastByEmploye(data.employeId);

        if(data.status === "ENTREE") {

    if(dernier?.status === "ENTREE") {

        throw new Error(
            "L'employé est déjà présent"
        );

    }

}


if(data.status === "SORTIE") {

    if(!dernier || dernier.status === "SORTIE") {

        throw new Error(
            "Impossible de faire une sortie sans entrée active"
        );

    }

}
        return this.repository.create({...data, alertHorsZone});

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