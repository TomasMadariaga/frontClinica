import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {useState} from 'react'
import Medicos from './components/Medicos';
import Register from './components/Register';
import Login from './components/Login';
import { Navbar } from './components/Navbar';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    console.log('Sesion iniciada con exito')
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn}/>
      <Routes>
        <Route path="/medicos" element={<Medicos />} />
        <Route path="/auth/register/patient" element={<Register />} />
        <Route path="/auth/login" element={<Login onLogin={handleLogin}/>} />
        {/* Otras rutas de tu aplicación */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;