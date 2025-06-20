import { useEffect, useState } from 'react';

export function useAuth() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/doctor/profile', {
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setDoctor(data);
        } else {
          setDoctor(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setDoctor(null);
        setLoading(false);
      });
  }, []);

  return { doctor, loading };
}
