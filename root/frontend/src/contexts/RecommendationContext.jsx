import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RecommendationContext = createContext();

export const useRecommendations = () => {
  const context = useContext(RecommendationContext);
  if (!context) {
    throw new Error(
      'useRecommendations must be used within RecommendationProvider'
    );
  }
  return context;
};

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const apiUrl = import.meta.env.VITE_API_URL;
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

  // Verificar se estamos em uma rota de paciente
  const isPatientRoute = location.pathname.startsWith('/patient');

  // Verificar se o cache é válido
  const isCacheValid = () => {
    if (!lastFetch || !recommendations) return false;
    const now = new Date().getTime();
    return now - lastFetch < CACHE_DURATION;
  };

  // Buscar recomendações
  const fetchRecommendations = async (forceRefresh = false) => {
    // Só buscar se estivermos em rota de paciente
    if (!isPatientRoute) {
      return null;
    }

    // Se tem cache válido e não é refresh forçado, retornar cache
    if (!forceRefresh && isCacheValid()) {
      console.log('Usando recomendações do cache frontend');
      return recommendations;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${apiUrl}/patient/recommendations${
          forceRefresh ? '?refresh=true' : ''
        }`,
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data);
        setLastFetch(new Date().getTime());

        // Salvar no localStorage também
        localStorage.setItem(
          'patient_recommendations',
          JSON.stringify({
            data,
            timestamp: new Date().getTime(),
          })
        );

        console.log('Recomendações atualizadas');
        return data;
      } else {
        throw new Error('Erro ao carregar recomendações');
      }
    } catch (err) {
      console.error('Erro ao buscar recomendações:', err);
      setError(err.message);

      // Tentar carregar do localStorage como fallback
      const cached = localStorage.getItem('patient_recommendations');
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached);
          const now = new Date().getTime();

          // Se o cache do localStorage ainda é válido (48h)
          if (now - timestamp < CACHE_DURATION * 2) {
            console.log('Usando cache do localStorage como fallback');
            setRecommendations(data);
            setLastFetch(timestamp);
            return data;
          }
        } catch (parseError) {
          console.error('Erro ao parse do cache localStorage:', parseError);
        }
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  // Invalidar cache
  const invalidateCache = () => {
    setRecommendations(null);
    setLastFetch(null);
    localStorage.removeItem('patient_recommendations');
    console.log('Cache de recomendações invalidado');
  };

  // Carregar cache do localStorage ao inicializar (apenas em rotas de paciente)
  useEffect(() => {
    if (!isPatientRoute) return;

    const cached = localStorage.getItem('patient_recommendations');
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        const now = new Date().getTime();

        if (now - timestamp < CACHE_DURATION) {
          setRecommendations(data);
          setLastFetch(timestamp);
          console.log('Cache carregado do localStorage');
        } else {
          localStorage.removeItem('patient_recommendations');
          console.log('Cache do localStorage expirado, removido');
        }
      } catch (error) {
        console.error('Erro ao carregar cache do localStorage:', error);
        localStorage.removeItem('patient_recommendations');
      }
    }
  }, [isPatientRoute]);

  // Limpar cache quando sair das rotas de paciente
  useEffect(() => {
    if (!isPatientRoute) {
      setRecommendations(null);
      setLastFetch(null);
      setError(null);
      setLoading(false);
    }
  }, [isPatientRoute]);

  const value = {
    recommendations,
    loading,
    error,
    lastFetch,
    fetchRecommendations,
    invalidateCache,
    isCacheValid: isCacheValid(),
    isPatientRoute,
  };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};
