import React, { useState } from 'react';
import FenetreModale from '../../../shared/components/FenetreModale';
import FormulaireChantier from './FormulaireChantier';
import Sidebar from '../../../shared/components/Sidebar';

type Chantier = {
  id?: string | number;
  nom: string;
  adresse: string;
  responsable: string;
  statut: string;
};

const initialChantiers: Chantier[] = [
  { id: 1, nom: 'Chantier Nord', adresse: '10 rue de l’Innovation', responsable: 'M. Diop', statut: 'En cours' },
  { id: 2, nom: 'Chantier Sud', adresse: '25 avenue des Fleurs', responsable: 'Mme Kone', statut: 'Planifié' },
];

export default function TableauChantiers() {
  const [chantiers, setChantiers] = useState<Chantier[]>(initialChantiers);
  const [editing, setEditing] = useState<Chantier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal(chantier: Chantier | null = null) {
    setEditing(chantier);
    setIsModalOpen(true);
  }

  function closeModal() {
    setEditing(null);
    setIsModalOpen(false);
  }

  function addOrUpdateChantier(chantier: Chantier) {
    if (chantier.id) {
      setChantiers((prev) => prev.map((item) => (item.id === chantier.id ? { ...item, ...chantier } : item)));
    } else {
      setChantiers((prev) => [...prev, { ...chantier, id: Date.now() }]);
    }
    closeModal();
  }

  async function handleDelete(id: string | number, name: string) {
    const confirmed = window.confirm(`Supprimer ${name} ?`);
    if (!confirmed) return;
    setChantiers((prev) => prev.filter((item) => item.id !== id));
  }

	return (
		<div className="min-h-screen bg-[#eef2ff] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
			<div className="mx-auto flex w-full flex-col gap-6 lg:flex-row">
				<Sidebar />
				<main className="flex-1 lg:ml-80 space-y-6">
					<div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
							<div>
								<p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Dashboard</p>
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

					<div className="grid gap-4 md:grid-cols-3">
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">Chantiers actifs</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">{chantiers.length}</p>
						</div>
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">En cours</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">{chantiers.filter((item) => item.statut === 'En cours').length}</p>
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
						<button
							type="button"
							className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
							onClick={() => openModal(null)}
						>
								+ Nouveau
							</button>
						</div>

						<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg">
							<table className="min-w-full divide-y divide-slate-200">
								<thead className="bg-slate-100">
									<tr>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nom</th>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Adresse</th>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Responsable</th>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Statut</th>
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
									) : chantiers.map((chantier) => (
										<tr key={String(chantier.id)} className="hover:bg-slate-50">
											<td className="px-4 py-3 text-sm text-slate-700">{chantier.nom}</td>
											<td className="px-4 py-3 text-sm text-slate-500">{chantier.adresse}</td>
											<td className="px-4 py-3 text-sm text-slate-500">{chantier.responsable}</td>
											<td className="px-4 py-3 text-sm text-slate-500">{chantier.statut}</td>
											<td className="px-4 py-3 text-sm">
												<button className="mr-2 rounded-md border border-slate-300 px-2 py-1 text-slate-700 transition hover:bg-slate-100" onClick={() => openModal(chantier)}>Éditer</button>
												<button className="rounded-md border border-rose-300 px-2 py-1 text-rose-600 transition hover:bg-rose-50" onClick={() => handleDelete(chantier.id!, `${chantier.nom}`)}>Supprimer</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>

			<FenetreModale open={isModalOpen} onClose={closeModal} title={editing?.id ? 'Modifier un chantier' : 'Ajouter un chantier'}>
				<FormulaireChantier edit={editing} onSubmit={addOrUpdateChantier} onCancel={closeModal} />
			</FenetreModale>
		</div>
	);
}
