import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Tentar verificar se é médico
        const doctorResponse = await fetch(`${apiUrl}/doctor/profile`, {
          credentials: 'include',
        });

        if (doctorResponse.ok) {
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Se não é médico, tentar verificar se é paciente
        const patientResponse = await fetch(`${apiUrl}/patient/get/data`, {
          credentials: 'include',
        });

        if (patientResponse.ok) {
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // Se não é nem médico nem paciente
        setIsAuthenticated(false);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    checkAuth();
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/doctor" replace />;
  }

  return children;
}
