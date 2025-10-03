import { useEffect, useState } from 'react';

export function patientAuth() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/patient/profile`, {
      credentials: 'include',
    })
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setPatient(data);
        } else {
          setPatient(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setPatient(null);
        setLoading(false);
      });
  }, []);

  return { patient, loading };
}
