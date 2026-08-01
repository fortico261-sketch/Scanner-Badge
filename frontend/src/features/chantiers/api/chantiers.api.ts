import client from '../../../shared/lib/client-http';

export type Chantier = {
  id?: string | number;
  nom: string;
  latitude: number;
  longitude: number;
  rayonToleranceM: number;
};

export const chantiersApi = {
  list: async (): Promise<Chantier[]> => {
    return client.get('/chantiers');
  },
  get: async (id: string | number): Promise<Chantier> => {
    return client.get(`/chantiers/${id}`);
  },
  create: async (payload: Chantier): Promise<Chantier> => {
    return client.post('/chantiers', payload);
  },
  update: async (id: string | number, payload: Chantier): Promise<Chantier> => {
    return client.put(`/chantiers/${id}`, payload);
  },
  del: async (id: string | number) => {
    return client.del(`/chantiers/${id}`);
  },
};
export default chantiersApi;