import { useEffect, useState } from 'react';
import paieApi, { Paie } from '../api/paie.api';

export default function usePaie() {
	const [paies, setPaies] = useState<Paie[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchAll() {
		setLoading(true);
		setError(null);
		try {
			const data = await paieApi.list();
			setPaies(data || []);
		} catch (err: any) {
			setError(err?.message || 'Erreur');
		} finally {
			setLoading(false);
		}
	}

	async function create(paie: Paie) {
		const res = await paieApi.create(paie);
		setPaies(prev => [...prev, res]);
		return res;
	}

	async function update(id: string | number, paie: Paie) {
		const res = await paieApi.update(id, paie);
		setPaies(prev => prev.map(p => (p.id === id ? res : p)));
		return res;
	}

	async function remove(id: string | number) {
		await paieApi.del(id);
		setPaies(prev => prev.filter(p => p.id !== id));
	}

	useEffect(() => {
		fetchAll();
	}, []);

	return { paies, loading, error, fetchAll, create, update, remove };
}