import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './Pages/DoctorPages/AuthPages/DoctorLogin';
import DoctorSingin from './Pages/DoctorPages/AuthPages/DoctorSingin';
import DoctorSinginConfirm from './Pages/DoctorPages/AuthPages/DoctorSinginConfirm';
import DoctorDashboard from './Pages/DoctorPages/DoctorDashboard';
import MainModule from './Pages/DoctorPages/PatientModulePages/MainModule';
import CreatePatient from './Pages/DoctorPages/PatientModulePages/CreatePatient';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/doctor" />} />{' '}
      {/* por enquanto, ir para a rota de login ao acessar '/' */}
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/singin/doctor" element={<DoctorSingin />} />
      <Route path="/singin/doctor/confirm" element={<DoctorSinginConfirm />} />
      <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
      <Route path="/doctor/patient" element={<MainModule />} />
      <Route path="/doctor/patient/create" element={<CreatePatient />} />
    </Routes>
  );
}

export default App;
