import React, { useEffect, useState } from 'react';
import chantiersApi, { Chantier } from '../../../features/chantiers/api/chantiers.api';

type Props = {
	edit?: any;
	onSubmit?: (employee: any) => void;
	onCancel?: () => void;
};

export default function FormulaireEmploye({ edit, onSubmit, onCancel }: Props) {
	const [nom, setNom] = useState('');
	const [prenom, setPrenom] = useState('');
	const [badgeId, setBadgeId] = useState('');
	const [tauxHoraire, setTauxHoraire] = useState('');
	const [volumeMensuelObligatoire, setVolumeMensuelObligatoire] = useState('');
	const [chantierId, setChantierId] = useState('');
	const [chantiers, setChantiers] = useState<Chantier[]>([]);
	const [chantiersLoading, setChantiersLoading] = useState(true);

	useEffect(() => {
		chantiersApi.list().then(data => {
			setChantiers(data || []);
			setChantiersLoading(false);
		}).catch(() => {
			setChantiersLoading(false);
		});
	}, []);

	useEffect(() => {
		if (edit) {
			setNom(edit.nom || '');
			setPrenom(edit.prenom || '');
			setBadgeId(edit.badgeId || '');
			setTauxHoraire(edit.tauxHoraire ?? '');
			setVolumeMensuelObligatoire(edit.volumeMensuelObligatoire ?? '');
			setChantierId(edit.chantierId || '');
		} else {
			setNom('');
			setPrenom('');
			setBadgeId('');
			setTauxHoraire('');
			setVolumeMensuelObligatoire('');
			setChantierId('');
		}
	}, [edit]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload = {
			...(edit || {}),
			nom,
			prenom,
			badgeId,
			tauxHoraire: parseFloat(tauxHoraire) || 0,
			volumeMensuelObligatoire: parseFloat(volumeMensuelObligatoire) || 0,
			chantierId,
		};
		onSubmit?.(payload);
	}

	const isEditing = Boolean(edit?.id);

	return (
		<form onSubmit={handleSubmit} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">
			<div className="mb-4">
				<h3 className="text-lg font-semibold text-white">{isEditing ? 'Modifier un employé' : 'Ajouter un employé'}</h3>
				<p className="mt-1 text-sm text-slate-400">{isEditing ? 'Mettez à jour les informations de l\'employé.' : 'Ajoutez un nouvel employé à votre équipe.'}</p>
			</div>

			<div className="space-y-3">
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Nom</label>
					<input required value={nom} onChange={e => setNom(e.target.value)} placeholder="Dupont" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Prénom</label>
					<input required value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Alice" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Badge ID</label>
					<input required value={badgeId} onChange={e => setBadgeId(e.target.value)} placeholder="BADGE-001" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Taux Horaire</label>
					<input required type="number" step="0.01" value={tauxHoraire} onChange={e => setTauxHoraire(e.target.value)} placeholder="15.50" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Volume Mensuel Obligatoire</label>
					<input required type="number" value={volumeMensuelObligatoire} onChange={e => setVolumeMensuelObligatoire(e.target.value)} placeholder="160" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Chantier</label>
					{chantiersLoading ? (
						<div className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-slate-500">Chargement des chantiers...</div>
					) : (
						<select
							required
							value={chantierId}
							onChange={e => setChantierId(e.target.value)}
							className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white focus:border-emerald-400 focus:outline-none"
						>
							<option value="">Sélectionner un chantier</option>
							{chantiers.map(c => (
								<option key={String(c.id)} value={String(c.id)}>{c.nom}</option>
							))}
						</select>
					)}
				</div>
			</div>

			<div className="mt-5 flex flex-wrap gap-3">
				{onCancel ? (
					<button type="button" onClick={onCancel} className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
						Annuler
					</button>
				) : null}
				<button type="submit" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400">
					{isEditing ? 'Enregistrer les modifications' : 'Créer l\'employé'}
				</button>
			</div>
		</form>
	);
}