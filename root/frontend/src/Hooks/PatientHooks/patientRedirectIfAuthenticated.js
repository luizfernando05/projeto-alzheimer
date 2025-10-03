import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function patientRedirectIfAuthenticated() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/patient/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/patient/dashboard');
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
      }
    };

    checkAuth();
  }, [navigate]);
}
