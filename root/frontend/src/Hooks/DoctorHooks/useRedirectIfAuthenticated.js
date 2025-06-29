import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useRedirectIfAuthenticated() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3001/doctor/profile', {
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
