export interface CreateCongeDto {
    employeId: string;
    dateDebut: Date;
    dateFin: Date;
}

export interface UpdateCongeDto {
    dateDebut?: Date;
    dateFin?: Date;
}