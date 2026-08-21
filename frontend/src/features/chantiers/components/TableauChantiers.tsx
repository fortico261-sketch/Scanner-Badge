import React, { useState } from 'react';
import FenetreModale from '../../../shared/components/FenetreModale';
import FormulaireChantier from './FormulaireChantier';
import Sidebar from '../../../shared/components/Sidebar';
import useChantiers from '../hooks/useChantiers';
import CarteChantiers from './CarteChantiers';

export default function TableauChantiers() {
	const { chantiers, loading, error, create, update, remove } = useChantiers();
	const [editing, setEditing] = useState<any>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	function openModal(chantier: any | null = null) {
		setEditing(chantier);
		setIsModalOpen(true);
	}

	function closeModal() {
		setEditing(null);
		setIsModalOpen(false);
	}

	async function addOrUpdateChantier(chantier: any) {
		if (chantier.id) {
			await update(chantier.id, chantier);
		} else {
			await create(chantier);
		}
		closeModal();
	}

	async function handleDelete(id: string | number, name: string) {
		const confirmed = window.confirm(`Supprimer ${name} ?`);
		if (!confirmed) return;
		await remove(id);
	}

	return (
		<div className="min-h-screen bg-[#eef2ff] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
			<div className="mx-auto flex w-full flex-col gap-6 lg:flex-row">
				<Sidebar />
				<main className="flex-1 lg:ml-80 space-y-6">
					<div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Dashboard</p>
								<h2 className="mt-2 text-2xl font-semibold text-slate-900">Gestion des chantiers</h2>
								<p className="mt-1 text-sm text-slate-500">Liste, ajout, modification et suppression des chantiers.</p>
							</div>
							<button
								type="button"
								className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
								onClick={() => openModal(null)}
							>
								+ Ajouter un chantier
							</button>
						</div>
					</div>

					{error && (
						<div className="rounded-[22px] border border-rose-300 bg-rose-50 p-4 text-rose-700">
							{error}
						</div>
					)}

					<div className="grid gap-4 md:grid-cols-3">
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">Chantiers</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">{loading ? '—' : chantiers.length}</p>
						</div>
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">En cours</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">0</p>
						</div>
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">Action rapide</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">CRUD</p>
						</div>
					</div>

					<div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl">
						<div className="mb-4 flex items-center justify-between">
							<div>
								<h3 className="text-lg font-semibold text-slate-900">Liste des chantiers</h3>
								<p className="text-sm text-slate-500">Consultez, modifiez ou supprimez un chantier en un clic.</p>
							</div>
							
						</div>

						{loading ? (
							<div className="py-8 text-center text-slate-500">Chargement...</div>
						) : (
							<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg">
								<table className="min-w-full divide-y divide-slate-200">
									<thead className="bg-slate-100">
										<tr>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nom</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Latitude</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Longitude</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Rayon Tolérance (m)</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-200">
										{chantiers.length === 0 ? (
											<tr>
												<td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
													Aucun chantier enregistré pour le moment.
												</td>
											</tr>
										) : chantiers.map(c => (
											<tr key={String(c.id)} className="hover:bg-slate-50">
												<td className="px-4 py-3 text-sm text-slate-700">{c.nom}</td>
												<td className="px-4 py-3 text-sm text-slate-500">{c.latitude ?? '—'}</td>
												<td className="px-4 py-3 text-sm text-slate-500">{c.longitude ?? '—'}</td>
												<td className="px-4 py-3 text-sm text-slate-500">{c.rayonToleranceM ?? '—'}</td>
												<td className="px-4 py-3 text-sm">
													<button className="mr-2 rounded-md border border-slate-300 px-2 py-1 text-slate-700 transition hover:bg-slate-100" onClick={() => openModal(c)}>Éditer</button>
													<button className="rounded-md border border-rose-300 px-2 py-1 text-rose-600 transition hover:bg-rose-50" onClick={() => handleDelete(c.id!, c.nom)}>Supprimer</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>

					<div className="grid gap-4 xl:grid-cols-[1fr_420px]">
						<div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl">
							<div className="flex items-center justify-between gap-3">
								<div>
									<h3 className="text-lg font-semibold text-slate-900">Détails du chantier</h3>
									<p className="text-sm text-slate-500">Sélectionnez un chantier pour voir son emplacement et sa zone.</p>
								</div>
							</div>
							<div className="mt-4 space-y-3 text-sm text-slate-700">
								<p>Choisissez un chantier dans le tableau pour le modifier ou consultez la carte à droite.</p>
								<p className="font-medium">Le plan s'ajuste automatiquement selon les coordonnées enregistrées.</p>
							</div>
						</div>
						<CarteChantiers chantiers={chantiers} />
					</div>
				</main>
			</div>

			<FenetreModale open={isModalOpen} onClose={closeModal} title={editing ? 'Modifier un chantier' : 'Ajouter un chantier'}>
				<FormulaireChantier edit={editing} onSubmit={addOrUpdateChantier} onCancel={closeModal} />
			</FenetreModale>
		</div>
	);
}
