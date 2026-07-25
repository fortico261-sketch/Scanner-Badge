import React, { useEffect, useState } from 'react';

type Props = {
  edit?: any;
  onSubmit?: (chantier: any) => void;
  onCancel?: () => void;
};

export default function FormulaireChantier({ edit, onSubmit, onCancel }: Props) {
  const [nom, setNom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [responsable, setResponsable] = useState('');
  const [statut, setStatut] = useState('En cours');

  useEffect(() => {
    if (edit) {
      setNom(edit.nom || '');
      setAdresse(edit.adresse || '');
      setResponsable(edit.responsable || '');
      setStatut(edit.statut || 'En cours');
    } else {
      setNom('');
      setAdresse('');
      setResponsable('');
      setStatut('En cours');
    }
  }, [edit]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { ...(edit || {}), nom, adresse, responsable, statut };
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
          <label className="mb-1 block text-sm font-medium text-slate-200">Adresse</label>
          <input required value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="10 rue de l’Innovation" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">Responsable</label>
          <input required value={responsable} onChange={(e) => setResponsable(e.target.value)} placeholder="M. Diop" className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-200">Statut</label>
          <select value={statut} onChange={(e) => setStatut(e.target.value)} className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2.5 text-white focus:border-emerald-400 focus:outline-none">
            <option value="En cours">En cours</option>
            <option value="Planifié">Planifié</option>
            <option value="Terminé">Terminé</option>
          </select>
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
