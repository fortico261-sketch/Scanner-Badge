import React, { useEffect, useState } from 'react';

type Props = {
	edit?: any;
	onSubmit?: (chantier: any) => void;
	onCancel?: () => void;
};

export default function FormulaireChantier({ edit, onSubmit, onCancel }: Props) {
	const [nom, setNom] = useState('');
	const [latitude, setLatitude] = useState('');
	const [longitude, setLongitude] = useState('');
	const [rayonToleranceM, setRayonToleranceM] = useState('');

	useEffect(() => {
		if (edit) {
			setNom(edit.nom || '');
			setLatitude(edit.latitude ?? '');
			setLongitude(edit.longitude ?? '');
			setRayonToleranceM(edit.rayonToleranceM ?? '');
		} else {
			setNom('');
			setLatitude('');
			setLongitude('');
			setRayonToleranceM('');
		}
	}, [edit]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload = {
			...(edit || {}),
			nom,
			latitude: parseFloat(latitude) || 0,
			longitude: parseFloat(longitude) || 0,
			rayonToleranceM: parseFloat(rayonToleranceM) || 0,
		};
		onSubmit?.(payload);
	}

	const isEditing = Boolean(edit?.id);

	return (
		<form onSubmit={handleSubmit} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">
			<div className="mb-4">
				<h3 className="text-lg font-semibold text-white">{isEditing ? 'Modifier un chantier' : 'Ajouter un chantier'}</h3>
				<p className="mt-1 text-sm text-slate-400">{isEditing ? 'Mettez à jour les informations du chantier.' : 'Ajoutez un nouveau chantier à la plateforme.'}</p>
			</div>

			<div className="space-y-3">
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Nom du chantier</label>
					<input required value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Chantier Nord" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Latitude</label>
					<input required type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="-18.7669" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Longitude</label>
					<input required type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="46.8691" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Rayon Tolérance (m)</label>
					<input required type="number" value={rayonToleranceM} onChange={(e) => setRayonToleranceM(e.target.value)} placeholder="100" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
			</div>

			<div className="mt-5 flex flex-wrap gap-3">
				{onCancel ? (
					<button type="button" onClick={onCancel} className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
						Annuler
					</button>
				) : null}
				<button type="submit" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400">
					{isEditing ? 'Enregistrer les modifications' : 'Créer le chantier'}
				</button>
			</div>
		</form>
	);
}