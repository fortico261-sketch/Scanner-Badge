export interface CreatePointageDTO {

    employeId: string;
    chantierId: string;

    lattitude: number;
    longitude: number;
    satellite: number;

    alertZone: boolean;

    status: "entrer" | "sortir";

}

export interface UpdatePointageDTO {

    lattitude: number;
    longitude: number;
    satellite: number;

    alertZone: boolean;

    status: "entrer" | "sortir";
}