import { useAuth } from '../Hooks/DoctorHooks/useAuth';
import { Navigate } from 'react-router-dom';
import { patientAuth } from '../Hooks/PatientHooks/patientAuth';

export function ProtectedRoute({ children }) {
  const { doctor, loading } = useAuth();
  const { patient, loading: patientLoading } = patientAuth();

  if (loading || patientLoading) {
    return <div className="loader"></div>;
  }

  if (!doctor && !patient) {
    return <Navigate to="/login/doctor" />;
  }

  return children;
}
