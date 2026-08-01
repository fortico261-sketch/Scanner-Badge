import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { employesApi } from '../employes/api/employes.api';
import StatChart from '../../shared/components/StatChart';
import Sidebar from '../../shared/components/Sidebar';

type Stats = {
  employes: number;
  chantiers: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    employes: 0,
    chantiers: 2,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const employes = await employesApi.list();
        setStats({
          employes: employes.length,
          chantiers: 2,
        });
      } catch {
        setStats({
          employes: 0,
          chantiers: 2,
        });
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    { label: 'Employés', value: stats.employes, color: 'text-blue-400' },
    { label: 'Chantiers', value: stats.chantiers, color: 'text-blue-400' },
  ];

  const chartData = statCards.map((card) => ({ label: card.label, value: card.value }));

  return (
    <div className="min-h-screen bg-[#eef2ff] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
    <div className="mx-auto flex w-full flex-col gap-6 lg:flex-row">
      <Sidebar />
      <main className="flex-1 lg:ml-80 lg:mr-8 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Scanner Badge</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
            Tableau de bord administrateur
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Gérez les employés et les chantiers depuis un espace unique.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {statCards.map((card) => (
              <div
                key={card.label}
                className="rounded-[22px] border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className={`mt-2 text-3xl font-semibold ${card.color}`}>
                  {loading ? '—' : card.value}
                </p>
              </div>
            ))}
          </div>

          <StatChart data={chartData} />
        </main>
      </div>
    </div>
  );
}
