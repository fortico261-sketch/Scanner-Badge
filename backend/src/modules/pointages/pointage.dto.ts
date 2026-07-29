import { StatutPointage } from "@prisma/client";

export interface CreatePointageDto {
    employeId: string;
    latitude: number;
    longitude: number;
    satelittes: number;
    alertHorsZone: boolean;
    status: StatutPointage;
    timestamp: string;
}

export interface PayloadPointage {
    uid: string;
    loc: LocationPointWithSat;
    timestamp: string;
    bat: number;
}

export interface LocationPoint {
    latitude: number;
    longitude: number;
}

interface LocationPointWithSat extends LocationPoint {
    satelittes: number;
}
