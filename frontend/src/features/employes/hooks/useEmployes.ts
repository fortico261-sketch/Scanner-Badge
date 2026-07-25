import { useEffect, useState } from 'react';
import employesApi, { Employee } from '../api/employes.api';

export default function useEmployes() {
	const [employes, setEmployes] = useState<Employee[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchAll() {
		setLoading(true);
		setError(null);
		try {
			const data = await employesApi.list();
			setEmployes(data || []);
		} catch (err: any) {
			setError(err?.message || 'Erreur');
		} finally {
			setLoading(false);
		}
	}

	async function create(emp: Employee) {
		const res = await employesApi.create(emp);
		setEmployes(prev => [...prev, res]);
		return res;
	}

	async function update(id: string | number, emp: Employee) {
		const res = await employesApi.update(id, emp);
		setEmployes(prev => prev.map(e => (e.id === id ? res : e)));
		return res;
	}

	async function remove(id: string | number) {
		await employesApi.del(id);
		setEmployes(prev => prev.filter(e => e.id !== id));
	}

	useEffect(() => {
		fetchAll();
	}, []);

	return { employes, loading, error, fetchAll, create, update, remove };
}

