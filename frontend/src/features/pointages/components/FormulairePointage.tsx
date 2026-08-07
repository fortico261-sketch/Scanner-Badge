import React, { useEffect, useMemo, useState } from 'react';
import { Pointage } from '../types';
import useEmployes from '../../employes/hooks/useEmployes';
import useChantiers from '../../chantiers/hooks/useChantiers';

type Props = {
  edit?: Pointage | null;
  onSubmit?: (pointage: Pointage) => void;
  onCancel?: () => void;
};

export default function FormulairePointage({ edit, onSubmit, onCancel }: Props) {
  const { employes } = useEmployes();
  const { chantiers } = useChantiers();
  const [employeId, setEmployeId] = useState('');
  const [chantierId, setChantierId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [satellites, setSatellites] = useState('');
  const [alertHorsZone, setAlertHorsZone] = useState(false);
  const [status, setStatus] = useState<'ENTREE' | 'SORTIE'>('ENTREE');

  const selectedEmploye = useMemo(
    () => employes.find((e) => String(e.id) === employeId),
    [employes, employeId]
  );

  const selectedChantier = useMemo(
    () => chantiers.find((c) => String(c.id) === chantierId),
    [chantiers, chantierId]
  );

  useEffect(() => {
    if (edit) {
      setEmployeId(String(edit.employeId || ''));
      setChantierId(String(edit.chantierId || ''));
      setLatitude(String(edit.latitude ?? ''));
      setLongitude(String(edit.longitude ?? ''));
      setSatellites(String(edit.satellites ?? ''));
      setAlertHorsZone(Boolean(edit.alertHorsZone));
      setStatus(edit.status || 'ENTREE');
    } else {
      setEmployeId('');
      setChantierId('');
      setLatitude('');
      setLongitude('');
      setSatellites('');
      setAlertHorsZone(false);
      setStatus('ENTREE');
    }
  }, [edit]);

  function handleEmployeChange(value: string) {
    setEmployeId(value);
    const employe = employes.find((e) => String(e.id) === value);
    if (employe?.chantierId) {
      setChantierId(String(employe.chantierId));
    } else {
      setChantierId('');
    }
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmit?.({
      ...(edit || {}),
      employeId,
      chantierId,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      satellites: parseInt(satellites, 10) || 0,
      alertHorsZone,
      status,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-slate-900">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-white">Employé</label>
          <select
            required
            value={employeId}
            onChange={(e) => handleEmployeChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Sélectionner un employé</option>
            {employes.map((e) => (
              <option key={String(e.id)} value={String(e.id)}>{`${e.nom} ${e.prenom}`}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-white">Chantier</label>
          <input
            disabled
            value={selectedChantier?.nom || 'Le chantier est défini par l’employé'}
            readOnly
            className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2 text-slate-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-white">Latitude</label>
          <input
            required
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-white">Longitude</label>
          <input
            required
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-white">Satellites</label>
          <input
            required
            type="number"
            value={satellites}
            onChange={(e) => setSatellites(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-white">Statut</label>
          <select
            required
            value={status}
            onChange={(e) => setStatus(e.target.value as 'ENTREE' | 'SORTIE')}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          >
            <option value="ENTREE">Entrée</option>
            <option value="SORTIE">Sortie</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm font-medium text-white">
          <input
            type="checkbox"
            checked={alertHorsZone}
            onChange={(e) => setAlertHorsZone(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          Alert hors zone
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-3">
        {onCancel ? (
          <button type="button" onClick={onCancel} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-100">
            Annuler
          </button>
        ) : null}
        <button type="submit" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500">
          {edit?.id ? 'Enregistrer' : 'Créer'}
        </button>
      </div>
    </form>
  );
}
