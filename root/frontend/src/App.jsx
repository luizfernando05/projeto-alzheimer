import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './Pages/DoctorPages/AuthPages/DoctorLogin';
import DoctorSingin from './Pages/DoctorPages/AuthPages/DoctorSingin';
import DoctorSinginConfirm from './Pages/DoctorPages/AuthPages/DoctorSinginConfirm';
import DoctorDashboard from './Pages/DoctorPages/DoctorDashboard';
import MainModule from './Pages/DoctorPages/PatientModulePages/MainModule';
import CreatePatient from './Pages/DoctorPages/PatientModulePages/CreatePatient';
import { ProtectedRoute } from './Components/ProtectedRoute';
import CreateMedicalData from './Pages/DoctorPages/PatientModulePages/CreateMedicalData';
import DoctorProfile from './Pages/DoctorPages/DoctorProfile';
import PredictPage from './Pages/DoctorPages/PredictionModulePages/PredictPage';
import ListPatients from './Pages/DoctorPages/PatientModulePages/ListPatients';
import EditPatient from './Pages/DoctorPages/PatientModulePages/EditPatient';
import PatientLogin from './Pages/PatientPages/AuthPages/PatientLogin';
import PatientDashboard from './Pages/PatientPages/PatientDashboard';
import PatientProfile from './Pages/PatientPages/PatientProfile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/doctor" />} />{' '}
      {/* por enquanto, ir para a rota de login ao acessar '/' */}
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/login/patient" element={<PatientLogin />} />
      <Route
        path="/patient/dashboard"
        element={
          <ProtectedRoute>
            <PatientDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patient/profile"
        element={
          <ProtectedRoute>
            <PatientProfile />
          </ProtectedRoute>
        }
      />
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
        path="/patients/:patientId/medical-data"
        element={
          <ProtectedRoute>
            <CreateMedicalData />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/profile"
        element={
          <ProtectedRoute>
            <DoctorProfile />
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
      <Route
        path="/doctor/predict/:patientId"
        element={
          <ProtectedRoute>
            <PredictPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patient/edit/:patientId"
        element={
          <ProtectedRoute>
            <EditPatient />
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/patient/list"
        element={
          <ProtectedRoute>
            <ListPatients />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
