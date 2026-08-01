import { useEffect, useState } from 'react';
import pointagesApi, { Pointage } from '../api/pointages.api';

export default function usePointages() {
	const [pointages, setPointages] = useState<Pointage[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchAll() {
		setLoading(true);
		setError(null);
		try {
			const data = await pointagesApi.list();
			setPointages(data || []);
		} catch (err: any) {
			setError(err?.message || 'Erreur');
		} finally {
			setLoading(false);
		}
	}

	async function create(pointage: Pointage) {
		const res = await pointagesApi.create(pointage);
		setPointages(prev => [...prev, res]);
		return res;
	}

	async function update(id: string | number, pointage: Pointage) {
		const res = await pointagesApi.update(id, pointage);
		setPointages(prev => prev.map(p => (p.id === id ? res : p)));
		return res;
	}

	async function remove(id: string | number) {
		await pointagesApi.del(id);
		setPointages(prev => prev.filter(p => p.id !== id));
	}

	useEffect(() => {
		fetchAll();
	}, []);

	return { pointages, loading, error, fetchAll, create, update, remove };
}