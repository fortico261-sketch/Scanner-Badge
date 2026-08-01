import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const token = localStorage.getItem('auth_token');

  return (
    <div className="relative min-h-screen bg-[#eef2ff] px-4 py-6 text-slate-900 md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <span className="text-2xl">🔍</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Scanner Badge</h1>
            <p className="text-xs text-slate-500">Gestion moderne des pointages</p>
          </div>
        </div>

        <Link
          to="/login"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-500"
        >
          Se connecter
        </Link>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center">
        <div className="flex-1 rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Bienvenue</p>
          <h2 className="mt-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            Gérez le pointage <span className="text-blue-600">en toute simplicité</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Centralisez les employés, les chantiers, les congés, la paie et les pointages dans une interface moderne et intuitive.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl">👥</p>
              <p className="mt-2 font-semibold text-slate-900">Employés</p>
              <p className="text-sm text-slate-500">Créez et gérez vos équipes</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl">🏗️</p>
              <p className="mt-2 font-semibold text-slate-900">Chantiers</p>
              <p className="text-sm text-slate-500">Suivez l’avancement par site</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl">⏱️</p>
              <p className="mt-2 font-semibold text-slate-900">Pointages</p>
              <p className="text-sm text-slate-500">Contrôle horaire fiable</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl">💰</p>
              <p className="mt-2 font-semibold text-slate-900">Paie</p>
              <p className="text-sm text-slate-500">Calcul et consultation</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl">📅</p>
              <p className="mt-2 font-semibold text-slate-900">Congés</p>
              <p className="text-sm text-slate-500">Demandes et validation</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-2xl">🛡️</p>
              <p className="mt-2 font-semibold text-slate-900">Sécurité</p>
              <p className="text-sm text-slate-500">Accès protégé et traçable</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
