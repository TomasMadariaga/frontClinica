import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Register from "./components/RegisterPatient";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
// import Payment from "./components/Payment";
import { Medic } from "./components/Medic";
import { Patient } from "./components/Patient";
import ClinicalHistory from "./components/MedicalHistory";
import { Profile } from "./components/Profile";

function App() {
  const { state, dispatch } = useAuth();
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    console.log(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    dispatch({ type: "LOGOUT" });
    window.location.href = "/auth/login";
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar user={user} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register/patient" element={<Register />} />
          <Route
            path="/auth/login"
            element={<Login handleLogin={handleLogin} />}
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/medic" element={<Medic />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/historia-clinica/:id" element={<ClinicalHistory />} />
          <Route path="/profile/:id" element={<Profile/>}/>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
