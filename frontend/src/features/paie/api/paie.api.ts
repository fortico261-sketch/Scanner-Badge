import client from '../../../shared/lib/client-http';

export type Paie = {
  id?: string | number;
  employeId: string | number;
  montant: number;
  mois: string;
  annee: number;
};

export const paieApi = {
  list: async (): Promise<Paie[]> => {
    return client.get('/paie');
  },
  get: async (id: string | number): Promise<Paie> => {
    return client.get(`/paie/${id}`);
  },
  create: async (payload: Paie): Promise<Paie> => {
    return client.post('/paie', payload);
  },
  update: async (id: string | number, payload: Paie): Promise<Paie> => {
    return client.put(`/paie/${id}`, payload);
  },
  del: async (id: string | number) => {
    return client.del(`/paie/${id}`);
  },
};

export default paieApi;