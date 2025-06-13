import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './Pages/DoctorPages/AuthPages/DoctorLogin';
import DoctorSingin from './Pages/DoctorPages/AuthPages/DoctorSingin';
import DoctorSinginConfirm from './Pages/DoctorPages/AuthPages/DoctorSinginConfirm';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/doctor" />} />{' '}
      {/* por enquanto, ir para a rota de login ao acessar '/' */}
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/singin/doctor" element={<DoctorSingin />} />
      <Route path="/singin/doctor/confirm" element={<DoctorSinginConfirm />} />
    </Routes>
  );
}

export default App;
