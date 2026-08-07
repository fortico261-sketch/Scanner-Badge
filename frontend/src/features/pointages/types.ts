export type PointageEmployee = {
  id: string;
  nom: string;
  prenom: string;
};

export type PointageChantier = {
  id: string;
  nom: string;
};

export type Pointage = {
  id?: string | number;
  employeId: string;
  chantierId: string;
  latitude: number;
  longitude: number;
  satellites: number;
  alertHorsZone: boolean;
  status: 'ENTREE' | 'SORTIE';
  timestamp?: string;
  employe?: PointageEmployee;
  chantier?: PointageChantier;
};
