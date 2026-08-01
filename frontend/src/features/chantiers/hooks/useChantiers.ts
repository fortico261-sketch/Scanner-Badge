import { useEffect, useState } from 'react';
import chantiersApi, { Chantier } from '../api/chantiers.api';

export default function useChantiers() {
	const [chantiers, setChantiers] = useState<Chantier[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchAll() {
		setLoading(true);
		setError(null);
		try {
			const data = await chantiersApi.list();
			setChantiers(data || []);
		} catch (err: any) {
			setError(err?.message || 'Erreur');
		} finally {
			setLoading(false);
		}
	}

	async function create(chantier: Chantier) {
		const res = await chantiersApi.create(chantier);
		setChantiers(prev => [...prev, res]);
		return res;
	}

	async function update(id: string | number, chantier: Chantier) {
		const res = await chantiersApi.update(id, chantier);
		setChantiers(prev => prev.map(c => (c.id === id ? res : c)));
		return res;
	}

	async function remove(id: string | number) {
		await chantiersApi.del(id);
		setChantiers(prev => prev.filter(c => c.id !== id));
	}

	useEffect(() => {
		fetchAll();
	}, []);

	return { chantiers, loading, error, fetchAll, create, update, remove };
}