import client from '../../../shared/lib/client-http';

export type Badge = {
  id?: string | number;
  uid: string;
  employeId: string;
};

export type BadgeEmployee = {
  id: string;
  nom: string;
  prenom: string;
};

export const badgesApi = {
  associate: async (payload: Badge): Promise<Badge> => {
    return client.post('/badges/associate', payload);
  },
  findEmployeeByUid: async (uid: string): Promise<BadgeEmployee> => {
    return client.get(`/badges/${uid}/employe`);
  },
};

export default badgesApi;
