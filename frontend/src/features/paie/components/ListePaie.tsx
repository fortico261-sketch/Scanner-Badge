import React from 'react';
import Sidebar from '../../../shared/components/Sidebar';
import usePaie from '../hooks/usePaie';

export default function ListePaie() {
	const { paies, loading, error } = usePaie();

	return (
		<div className="min-h-screen bg-[#eef2ff] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
			<div className="mx-auto flex w-full flex-col gap-6 lg:flex-row">
				<Sidebar />
				<main className="flex-1 lg:ml-80">
					<div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
						<p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Dashboard</p>
						<h2 className="mt-2 text-2xl font-semibold text-slate-900">Paie</h2>
					</div>

					{error && (
						<div className="mt-4 rounded-[22px] border border-rose-300 bg-rose-50 p-4 text-rose-700">
							{error}
						</div>
					)}

					<div className="mt-4 rounded-[24px] border border-slate-200 bg-white p-4 shadow-xl">
						{loading ? (
							<div className="py-8 text-center text-slate-500">Chargement...</div>
						) : (
							<div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg">
								<table className="min-w-full divide-y divide-slate-200">
									<thead className="bg-slate-100">
										<tr>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Employé ID</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Montant</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Mois</th>
											<th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Année</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-slate-200">
										{paies.length === 0 ? (
											<tr>
												<td colSpan={4} className="px-4 py-8 text-center text-sm text-slate-500">
													Aucun bulletin de paie enregistré.
												</td>
											</tr>
										) : paies.map(p => (
											<tr key={String(p.id)} className="hover:bg-slate-50">
												<td className="px-4 py-3 text-sm text-slate-700">{p.employeId}</td>
												<td className="px-4 py-3 text-sm text-slate-500">{p.montant} €</td>
												<td className="px-4 py-3 text-sm text-slate-500">{p.mois}</td>
												<td className="px-4 py-3 text-sm text-slate-500">{p.annee}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}