import { Routes, Route, Navigate } from 'react-router-dom';
import DoctorLogin from './Pages/DoctorPages/DoctorLogin';
import DoctorSingin from './Pages/DoctorPages/DoctorSingin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login/doctor" />} />{' '}
      {/* por enquanto, ir para a rota de login ao acessar '/' */}
      <Route path="/login/doctor" element={<DoctorLogin />} />
      <Route path="/singin/doctor" element={<DoctorSingin />} />
    </Routes>
  );
}

export default App;
