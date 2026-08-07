import React from 'react';
import { Link } from 'react-router-dom';

const adminLinks = [
  { to: '/chantiers', label: 'Chantiers' },
  { to: '/employes', label: 'Employés' },
  { to: '/badges', label: 'Badges' },
  { to: '/pointages', label: 'Pointages' },
  { to: '/conges', label: 'Congés' },
  { to: '/paie', label: 'Paies' },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-full max-w-xs flex-col items-center rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl">
      <div className="w-full text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-600">Admin</p>
        <Link to="/admin" className="hover:opacity-80 transition">
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Dashboard</h2>
        </Link>
      </div>

      <nav className="mt-6 w-full space-y-3">
        {adminLinks.map((link) => (
          <Link
            key={link.label}
            to={link.to}
            className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center transition hover:bg-blue-50 hover:border-blue-300"
          >
            <div className="font-semibold text-slate-900">{link.label}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
