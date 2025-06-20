import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './Pages/DoctorPages/AuthPages/DoctorLogin';
import DoctorSingin from './Pages/DoctorPages/AuthPages/DoctorSingin';
import DoctorSinginConfirm from './Pages/DoctorPages/AuthPages/DoctorSinginConfirm';
import DoctorDashboard from './Pages/DoctorPages/DoctorDashboard';
import MainModule from './Pages/DoctorPages/PatientModulePages/MainModule';
import CreatePatient from './Pages/DoctorPages/PatientModulePages/CreatePatient';
import { ProtectedRoute } from './Components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/doctor" />} />{' '}
      {/* por enquanto, ir para a rota de login ao acessar '/' */}
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/singin/doctor" element={<DoctorSingin />} />
      <Route path="/singin/doctor/confirm" element={<DoctorSinginConfirm />} />
      <Route
        path="/doctor/dashboard"
        element={
          <ProtectedRoute>
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patient"
        element={
          <ProtectedRoute>
            <MainModule />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patient/create"
        element={
          <ProtectedRoute>
            <CreatePatient />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
