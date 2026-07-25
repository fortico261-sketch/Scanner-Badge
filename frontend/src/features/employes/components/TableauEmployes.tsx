import React, { useEffect, useState } from 'react';
import FenetreModale from '../../../shared/components/FenetreModale';
import FormulaireEmploye from './FormulaireEmploye';
import Sidebar from '../../../shared/components/Sidebar';

type Employee = {
	id?: string | number;
	nom: string;
	prenom: string;
	email?: string;
	poste?: string;
};

const initialEmployees: Employee[] = [
	{ id: 1, nom: 'Dupont', prenom: 'Alice', email: 'alice@scanbadge.com', poste: 'Manager' },
	{ id: 2, nom: 'Martin', prenom: 'Jean', email: 'jean@scanbadge.com', poste: 'Agent' },
];

export default function TableauEmployes() {
	const [employes, setEmployes] = useState<Employee[]>(initialEmployees);
	const [editing, setEditing] = useState<Employee | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		function onEdit(e: Event) {
			setEditing((e as CustomEvent<Employee>).detail || null);
			setIsModalOpen(true);
		}
		function onSaved() {
			setEditing(null);
			setIsModalOpen(false);
		}
		function onNew() {
			setEditing(null);
			setIsModalOpen(false);
		}
		window.addEventListener('edit-employe', onEdit as EventListener);
		window.addEventListener('saved-employe', onSaved as EventListener);
		window.addEventListener('new-employe', onNew as EventListener);
		return () => {
			window.removeEventListener('edit-employe', onEdit as EventListener);
			window.removeEventListener('saved-employe', onSaved as EventListener);
			window.removeEventListener('new-employe', onNew as EventListener);
		};
	}, []);

	function openModal(employee: Employee | null = null) {
		setEditing(employee);
		setIsModalOpen(true);
	}

	function closeModal() {
		setEditing(null);
		setIsModalOpen(false);
	}

	function addOrUpdateEmployee(employee: Employee) {
		if (employee.id) {
			setEmployes(prev => prev.map(item => (item.id === employee.id ? { ...item, ...employee } : item)));
		} else {
			setEmployes(prev => [...prev, { ...employee, id: Date.now() }]);
		}
		closeModal();
		window.dispatchEvent(new CustomEvent('saved-employe'));
	}

	async function handleDelete(id: string | number, name: string) {
		const confirmed = window.confirm(`Supprimer ${name} ?`);
		if (!confirmed) return;
		setEmployes(prev => prev.filter(item => item.id !== id));
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
								<h2 className="mt-2 text-2xl font-semibold text-slate-900">Gestion des employés</h2>
								<p className="mt-1 text-sm text-slate-500">Liste, ajout, modification et suppression des employés.</p>
							</div>
							<button
								type="button"
								className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
								onClick={() => openModal(null)}
							>
								+ Ajouter un employé
							</button>
						</div>
					</div>

					<div className="grid gap-4 md:grid-cols-3">
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">Employés actifs</p>
							<p className="mt-1 text-2xl font-semibold text-slate-900">{employes.length}</p>
						</div>
						<div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 shadow-sm">
							<p className="text-sm text-slate-500">À valider</p>
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
								<h3 className="text-lg font-semibold text-slate-900">Liste des employés</h3>
								<p className="text-sm text-slate-500">Consultez, modifiez ou supprimez un employé en un clic.</p>
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
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Prénom</th>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Email</th>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Poste</th>
										<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-200">
									{employes.length === 0 ? (
										<tr>
											<td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-500">
												Aucun employé enregistré pour le moment.
											</td>
										</tr>
									) : employes.map(e => (
										<tr key={String(e.id)} className="hover:bg-slate-50">
											<td className="px-4 py-3 text-sm text-slate-700">{e.nom}</td>
											<td className="px-4 py-3 text-sm text-slate-700">{e.prenom}</td>
											<td className="px-4 py-3 text-sm text-slate-500">{e.email || '—'}</td>
											<td className="px-4 py-3 text-sm text-slate-500">{e.poste || '—'}</td>
											<td className="px-4 py-3 text-sm">
												<button className="mr-2 rounded-md border border-slate-300 px-2 py-1 text-slate-700 transition hover:bg-slate-100" onClick={() => openModal(e)}>Éditer</button>
												<button className="rounded-md border border-rose-300 px-2 py-1 text-rose-600 transition hover:bg-rose-50" onClick={() => handleDelete(e.id!, `${e.prenom} ${e.nom}`.trim())}>Supprimer</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</main>
			</div>

			<FenetreModale open={isModalOpen} onClose={closeModal} title={editing?.id ? 'Modifier un employé' : 'Ajouter un employé'}>
				<FormulaireEmploye edit={editing} onSubmit={addOrUpdateEmployee} onCancel={closeModal} />
			</FenetreModale>
		</div>
	);
}
