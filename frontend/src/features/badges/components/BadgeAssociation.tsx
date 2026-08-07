import React, { useState } from 'react';
import Sidebar from '../../../shared/components/Sidebar';
import FenetreModale from '../../../shared/components/FenetreModale';
import useBadges from '../hooks/useBadges';
import useEmployes from '../../employes/hooks/useEmployes';
import useChantiers from '../../chantiers/hooks/useChantiers';

export default function BadgeAssociation() {
  const { associate, loading: badgeLoading, error: badgeError } = useBadges();
  const { employes, loading: employesLoading, error: employesError, fetchAll } = useEmployes();
  const { chantiers } = useChantiers();
  const [uid, setUid] = useState('');
  const [employeId, setEmployeId] = useState('');
  const [result, setResult] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleAssociate(event: React.FormEvent) {
    event.preventDefault();
    try {
      await associate({ uid, employeId });
      const employe = employes.find((e) => String(e.id) === employeId);
      const employeNom = employe ? `${employe.nom} ${employe.prenom}` : employeId;
      setResult(`Badge ${uid} associé à l'employé ${employeNom}`);
      setUid('');
      setEmployeId('');
      setIsModalOpen(false);
      await fetchAll();
    } catch (err: any) {
      setResult(err?.message || 'Erreur lors de l association du badge');
    }
  }

  const chantierMap = chantiers.reduce<Record<string, string>>((map, chantier) => {
    if (chantier.id !== undefined) {
      map[String(chantier.id)] = chantier.nom;
    }
    return map;
  }, {});

  const associations = employes.filter((e) => e.badgeId || e.badge?.uid);

  return (
    <div className="min-h-screen bg-[#eef2ff] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
      <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row">
        <Sidebar />
        <main className="flex-1 lg:ml-80 space-y-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Dashboard</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Gestion des badges</h2>
                <p className="mt-1 text-sm text-slate-500">Consultez les badges associés et ajoutez une nouvelle association.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
              >
                + Associer un badge
              </button>
            </div>
          </div>

          {(employesError || badgeError) && (
            <div className="rounded-[22px] border border-rose-300 bg-rose-50 p-4 text-rose-700">
              {employesError || badgeError}
            </div>
          )}

          {result ? (
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 text-slate-700">{result}</div>
          ) : null}

          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Liste des badges associés</h3>
                <p className="text-sm text-slate-500">UID du badge et employé correspondant.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">{associations.length} associations</span>
            </div>

            {employesLoading ? (
              <div className="py-8 text-center text-slate-500">Chargement...</div>
            ) : associations.length === 0 ? (
              <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">Aucune association de badge trouvée.</div>
            ) : (
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-lg">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">UID Badge</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Employé</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nom chantier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {associations.map((e) => (
                      <tr key={String(e.id)} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm text-slate-700">{e.badgeId || e.badge?.uid}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{`${e.nom} ${e.prenom}`}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{chantierMap[e.chantierId] || e.chantierId || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <FenetreModale open={isModalOpen} onClose={() => setIsModalOpen(false)} title="Associer un badge">
            <form onSubmit={handleAssociate} className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">UID du badge</label>
                <input
                  required
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                  placeholder="BADGE-001"
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">Employé</label>
                <select
                  required
                  value={employeId}
                  onChange={(e) => setEmployeId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white focus:border-emerald-400 focus:outline-none"
                >
                  <option value="">Sélectionner un employé</option>
                  {employes.map((e) => (
                    <option key={String(e.id)} value={String(e.id)}>{`${e.nom} ${e.prenom}`}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={badgeLoading}
                  className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Associer
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
                >
                  Annuler
                </button>
              </div>
            </form>
          </FenetreModale>
        </main>
      </div>
    </div>
  );
}
