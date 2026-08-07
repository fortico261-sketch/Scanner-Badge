export interface CreatePointageDTO {

    employeId: string;
    chantierId: string;

    latitude?: number;
    longitude?: number;
    satellites?: number;

    status: "ENTREE" | "SORTIE";

}

export interface UpdatePointageDTO {

    latitude?: number;
    longitude?: number;
    satellites?: number;

    status: "ENTREE" | "SORTIE";
}

export interface CreatePointageData extends CreatePointageDTO {
    alertHorsZone: boolean;
}