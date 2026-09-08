import { PaieRepository } from "./paie.repository";

const HEURES_THEORIQUES_PAR_JOUR = 8;
const MAJORATION_HEURES_SUPPLEMENTAIRES = 1.25;

export class PaieService {

  private repository: PaieRepository;

    constructor(repository?: PaieRepository) {
        this.repository = repository ?? new PaieRepository();
    }

    async calculerPaie( employeId: string, dateDebut: Date, dateFin: Date ) {

        const employe = await this.repository.findEmployeWithData( employeId, dateDebut, dateFin );

        if (!employe) {
            throw new Error("Employé introuvable");
        }

        const heuresTravaillees = this.calculerHeuresTravaillees( employe.pointages );

        const joursCongesPayes = this.calculerJoursConges( employe.conges, dateDebut, dateFin );

        const heuresCongesPayes = joursCongesPayes * HEURES_THEORIQUES_PAR_JOUR;

        const heuresSupplementaires = Math.max( 0, heuresTravaillees - employe.volumeMensuelObligatoire );

        const heuresNormales = Math.min( heuresTravaillees, employe.volumeMensuelObligatoire );

        const heuresAbsenceNonJustifiee = Math.max(
            0,
            employe.volumeMensuelObligatoire
            - heuresTravaillees
            - heuresCongesPayes
        );

        const tauxHoraire = Number(employe.tauxHoraire);

        const salaireHeuresTravaillees = heuresNormales * tauxHoraire;

        const salaireCongesPayes = heuresCongesPayes * tauxHoraire;

        const bonusHeuresSupplementaires = heuresSupplementaires * tauxHoraire * MAJORATION_HEURES_SUPPLEMENTAIRES;

        const penalites = heuresAbsenceNonJustifiee * tauxHoraire;

        const salaireTotal = salaireHeuresTravaillees + salaireCongesPayes + bonusHeuresSupplementaires - penalites;

        return {
            employeId: employe.id,
            nom: employe.nom,
            prenom: employe.prenom,

            periode: {
                dateDebut,
                dateFin
            },

            tauxHoraire,

            heuresTravaillees,
            heuresCongesPayes,
            heuresSupplementaires,
            heuresAbsenceNonJustifiee,

            joursCongesPayes,

            salaireHeuresTravaillees,
            salaireCongesPayes,
            bonusHeuresSupplementaires,
            penalites,

            salaireTotal
        };
    }


    private calculerHeuresTravaillees(pointages: any[]): number {

        let heures = 0;
        let entree: Date | null = null;

        for (const pointage of pointages) {

            if (pointage.status === "ENTREE") {
                entree = new Date(pointage.timestamp);
            }

            if (pointage.status === "SORTIE" && entree) {

                const sortie = new Date(pointage.timestamp);

                const difference = sortie.getTime() - entree.getTime();

                heures += difference / (1000 * 60 * 60);

                entree = null;
            }
        }

        return Number(heures.toFixed(2));
    }


    private calculerJoursConges(conges: any[], dateDebut: Date, dateFin: Date ): number {

        let total = 0;

        for (const conge of conges) {

            const debut = new Date( Math.max( conge.dateDebut.getTime(), dateDebut.getTime()) );

            const fin = new Date( Math.min( conge.dateFin.getTime(), dateFin.getTime()) );

            if (debut <= fin) {

                const difference = fin.getTime() - debut.getTime();

                const jours = Math.floor( difference / (1000 * 60 * 60 * 24) ) + 1;

                total += jours;
            }
        }

        return total;
    }
}