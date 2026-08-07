import { useEffect, useState } from 'react';
import badgesApi, { Badge } from '../api/badges.api';

export default function useBadges() {
  const [badge, setBadge] = useState<Badge | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function associate(payload: Badge) {
    setLoading(true);
    setError(null);
    try {
      const response = await badgesApi.associate(payload);
      setBadge(response);
      return response;
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de l association du badge');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function fetchEmployee(uid: string) {
    setLoading(true);
    setError(null);
    try {
      const employee = await badgesApi.findEmployeeByUid(uid);
      return employee;
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la récupération de l employé');
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { badge, loading, error, associate, fetchEmployee };
}
