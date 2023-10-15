import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData)
  };

  const handleLogout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    // Limpia loggedInUser
    setUser('');

    // Redirige a /iniciarSesion
    window.location.href = '/auth/login'; // Utiliza window.location.href para redirigir
  };

 

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isLoggedIn} user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/auth/register/patient" element={<Register />} />
        <Route path="/auth/login" element={<Login handleLogin={handleLogin} />} />
        {/* Otras rutas de tu aplicación */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
