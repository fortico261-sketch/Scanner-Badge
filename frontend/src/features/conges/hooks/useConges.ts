import { useEffect, useState } from 'react';
import congesApi, { Conge } from '../api/conges.api';

export default function useConges() {
	const [conges, setConges] = useState<Conge[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchAll() {
		setLoading(true);
		setError(null);
		try {
			const data = await congesApi.list();
			setConges(data || []);
		} catch (err: any) {
			setError(err?.message || 'Erreur');
		} finally {
			setLoading(false);
		}
	}

	async function create(conge: Conge) {
		const res = await congesApi.create(conge);
		setConges(prev => [...prev, res]);
		return res;
	}

	async function update(id: string | number, conge: Conge) {
		const res = await congesApi.update(id, conge);
		setConges(prev => prev.map(c => (c.id === id ? res : c)));
		return res;
	}

	async function remove(id: string | number) {
		await congesApi.del(id);
		setConges(prev => prev.filter(c => c.id !== id));
	}

	useEffect(() => {
		fetchAll();
	}, []);

	return { conges, loading, error, fetchAll, create, update, remove };
}