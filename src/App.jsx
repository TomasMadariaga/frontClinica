import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./components/RegisterPatient";
import Login from "./components/Login";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";
import Footer from "./components/Footer";
import { Medic } from "./components/Medic";
import { Patient } from "./components/Patient";
import ClinicalHistory from "./components/MedicalHistory";
import MedicalList from "./components/MedicList";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Visits from "./components/Visits";
import Contact from "./components/Contact";
import { Profile } from "./components/Profile";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Payment } from "./components/Payment";
import { ToastContainer } from "react-toastify";

function App() {
  
  const { state, dispatch } = useAuth();
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    dispatch({ type: "LOGOUT" });
    window.location.href = "/auth/login";
  };

  const initialOptions = {
    clientId:
      "AUZIXJ5RkyqnZkjTcK8PQ6tnhraDd2cHn0SdM5ZkYQRt28fXJVCkwX72u56djM4ucxYZ_A21VMNtEgEa",
    currency: "USD",
    intent: "CAPTURE",
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <PayPalScriptProvider>
          <ToastContainer/>
          <Navbar user={user} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth/register/patient"
              element={<Register title="register" />}
            />
            <Route
              path="/auth/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/admin" element={<Admin />} />
            <Route path="/medic" element={<Medic />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/historia-clinica/:id" element={<ClinicalHistory />} />
            <Route path="/medical-list" element={<MedicalList />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/hours-of-operation-and-visits" element={<Visits />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
          <Footer />
        </PayPalScriptProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
