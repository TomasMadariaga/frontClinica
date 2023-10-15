import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Medicos from './components/Medicos';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <h1>Clinica Online</h1>
      <Routes>
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/auth/register/patient" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        {/* Otras rutas de tu aplicación */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;