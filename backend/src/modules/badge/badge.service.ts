import { BadgeRepository } from "./badge.repository";

export class BadgeService {
    
    private repository = new BadgeRepository();

    async asociateBadge(uid: string, employeId: string) {

        const existBadge = await this.repository.exists(uid);

        if(existBadge) {
            throw new Error("Badge deja associe");
        }

        const employeBadge = await this.repository.finddByEmployeId(employeId);

        if(employeBadge) {
            throw new Error("Employe possede deja une badge")
        }

        return this.repository.create(uid,employeId);

    }

    async getEmployeByBafge(uid: string) {
        
        const badge = await this.repository.findByUiId(uid);

        if(!badge) {
            throw new Error("Badge inconnue")
        }
        
        return badge.employe
    }

}    

