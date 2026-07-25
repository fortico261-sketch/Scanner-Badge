import client from '../../../shared/lib/client-http';

export type Employee = {
	id?: string | number;
	nom: string;
	prenom: string;
	email?: string;
	poste?: string;
};

export const employesApi = {
	list: async (): Promise<Employee[]> => {
		return client.get('/employes');
	},
	get: async (id: string | number): Promise<Employee> => {
		return client.get(`/employes/${id}`);
	},
	create: async (payload: Employee): Promise<Employee> => {
		return client.post('/employes', payload);
	},
	update: async (id: string | number, payload: Employee): Promise<Employee> => {
		return client.put(`/employes/${id}`, payload);
	},
	del: async (id: string | number) => {
		return client.del(`/employes/${id}`);
	},
};

export default employesApi;
