import { db } from '@/config/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const useCharms = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = collection(db, 'users');
        const querySnapshot = await getDocs(query);

        // Map through documents and extract inventory data
        const userCharms = querySnapshot.docs.map((doc) => ({
          inventory: doc.data().inventory || [],
        }));

        // Sample data
        // {
        //     inventory: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]   
        // }

        setData(userCharms);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCharms;
