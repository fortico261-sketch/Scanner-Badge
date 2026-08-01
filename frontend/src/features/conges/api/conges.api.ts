import client from '../../../shared/lib/client-http';

export type Conge = {
  id?: string | number;
  employeId: string | number;
  type: string;
  dateDebut: string;
  dateFin: string;
  statut: string;
};

export const congesApi = {
  list: async (): Promise<Conge[]> => {
    return client.get('/conges');
  },
  get: async (id: string | number): Promise<Conge> => {
    return client.get(`/conges/${id}`);
  },
  create: async (payload: Conge): Promise<Conge> => {
    return client.post('/conges', payload);
  },
  update: async (id: string | number, payload: Conge): Promise<Conge> => {
    return client.put(`/conges/${id}`, payload);
  },
  del: async (id: string | number) => {
    return client.del(`/conges/${id}`);
  },
};

export default congesApi;