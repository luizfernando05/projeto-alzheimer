import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRedirectIfAuthenticated() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiUrl}/doctor/profile`, {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/doctor/dashboard');
        }
      } catch (err) {
        console.error('Erro ao verificar autenticação:', err);
      }
    };

    checkAuth();
  }, [navigate]);
}
