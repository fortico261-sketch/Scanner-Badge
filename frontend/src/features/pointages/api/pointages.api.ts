import client from '../../../shared/lib/client-http';

export type Pointage = {
  id?: string | number;
  employeId: string | number;
  chantierId: string | number;
  date: string;
  heureEntree: string;
  heureSortie?: string;
};

export const pointagesApi = {
  list: async (): Promise<Pointage[]> => {
    return client.get('/pointages');
  },
  get: async (id: string | number): Promise<Pointage> => {
    return client.get(`/pointages/${id}`);
  },
  create: async (payload: Pointage): Promise<Pointage> => {
    return client.post('/pointages', payload);
  },
  update: async (id: string | number, payload: Pointage): Promise<Pointage> => {
    return client.put(`/pointages/${id}`, payload);
  },
  del: async (id: string | number) => {
    return client.del(`/pointages/${id}`);
  },
};

export default pointagesApi;