import { useAuth } from '../Hooks/DoctorHooks/useAuth';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
  const { doctor, loading } = useAuth();

  if (loading) {
    return <div className="loader"></div>;
  }

  if (!doctor) {
    return <Navigate to="/login/doctor" />;
  }

  return children;
}
