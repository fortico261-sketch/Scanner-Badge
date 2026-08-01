import client from '../../../shared/lib/client-http';

export type Employee = {
	id?: string | number;
	nom: string;
	prenom: string;
	badgeId: string;
	tauxHoraire: number;
	volumeMensuelObligatoire: number;
	chantierId: string;
};

export const employesApi = {
	list: async (): Promise<Employee[]> => {
		return client.get('/employes'); // <-- Ajoute le S ici
	},
	get: async (id: string | number): Promise<Employee> => {
		return client.get(`/employes/${id}`); // <-- et ici
	},
	create: async (payload: Employee): Promise<Employee> => {
		return client.post('/employes', payload); // <-- et ici
	},
	update: async (id: string | number, payload: Employee): Promise<Employee> => {
		return client.put(`/employes/${id}`, payload); // <-- et ici
	},
	del: async (id: string | number) => {
		return client.del(`/employes/${id}`); // <-- et ici
	},
};

export default employesApi;