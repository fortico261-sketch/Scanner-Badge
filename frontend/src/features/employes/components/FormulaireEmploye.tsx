import React, { useEffect, useState } from 'react';

type Props = {
	edit?: any;
	onSubmit?: (employee: any) => void;
	onCancel?: () => void;
};

export default function FormulaireEmploye({ edit, onSubmit, onCancel }: Props) {
	const [nom, setNom] = useState('');
	const [prenom, setPrenom] = useState('');
	const [email, setEmail] = useState('');
	const [poste, setPoste] = useState('');

	useEffect(() => {
		if (edit) {
			setNom(edit.nom || '');
			setPrenom(edit.prenom || '');
			setEmail(edit.email || '');
			setPoste(edit.poste || '');
		} else {
			setNom('');
			setPrenom('');
			setEmail('');
			setPoste('');
		}
	}, [edit]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		const payload = { ...(edit || {}), nom, prenom, email, poste };
		onSubmit?.(payload);
	}

	const isEditing = Boolean(edit?.id);

	return (
		<form onSubmit={handleSubmit} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 shadow-2xl backdrop-blur-xl">
			<div className="mb-4">
				<h3 className="text-lg font-semibold text-white">{isEditing ? 'Modifier un employé' : 'Ajouter un employé'}</h3>
				<p className="mt-1 text-sm text-slate-400">{isEditing ? 'Mettez à jour les informations de l’employé.' : 'Ajoutez un nouvel employé à votre équipe.'}</p>
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
					<label className="mb-1 block text-sm font-medium text-slate-200">Email</label>
					<input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alice@scanbadge.com" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
				<div>
					<label className="mb-1 block text-sm font-medium text-slate-200">Poste</label>
					<input value={poste} onChange={e => setPoste(e.target.value)} placeholder="Manager" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
				</div>
			</div>

			<div className="mt-5 flex flex-wrap gap-3">
				{onCancel ? (
					<button type="button" onClick={onCancel} className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10">
						Annuler
					</button>
				) : null}
				<button type="submit" className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400">
					{isEditing ? 'Enregistrer les modifications' : 'Créer l’employé'}
				</button>
			</div>
		</form>
	);
}

