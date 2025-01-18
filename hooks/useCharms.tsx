import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useUser } from './useUser';
import { mockCharms } from '@/src/constants/constants';

interface Charm {
  id: number;
  name: string;
  image: any;
  quantity: number;
}

export function useCharms() {
  const [charms, setCharms] = useState<Charm[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    async function fetchCharms() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        const token = await user.getIdToken();
        const response = await fetch('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        const inventory = data.profile.inventory;

        // Transform the inventory array into charm objects with mockCharms data
        const charmsData = inventory
          .map((quantity: number, index: number) => {
            const mockCharm = mockCharms[index];
            return {
              id: mockCharm.id,
              name: mockCharm.name,
              image: mockCharm.image,
              quantity,
            };
          })
          .filter((charm: Charm) => charm.quantity > 0); // Only show owned charms

        setCharms(charmsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCharms();
  }, []);

  return { charms, loading, error };
}
