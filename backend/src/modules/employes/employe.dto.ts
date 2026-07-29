export interface CreateEmployeDTO {
    nom: String;
    prenom: String;
    badgeId: String;
    tauxHoraire: number;
    volumeMensuelObligatoire: number;
    chantierId: String;
}

export interface UpdateEmployeDTO {
    nom?: String;
    prenom?: String;
    badgeId?: String;
    tauxHoraire?: number;
    volumeMensuelObligatoire?: number;
    chantierId?: String;
}
