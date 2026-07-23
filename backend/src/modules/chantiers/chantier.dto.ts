export interface CreateChantierDTO {
    nom: string;
    latitude: number;
    longitude: number;
    rayonToleranceM: number;
}


export interface UpdateChantierDTO {
    nom?: string;
    latitude?: number;
    longitude?: number;
    rayonToleranceM?: number;
}