import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log("Inicio de sesión exitoso:", response.data);

      // Aquí puedes guardar el token en el almacenamiento local o en las cookies
      // y redirigir al usuario a la página correspondiente según su rol
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleShowPassword}
          />
          Mostrar contraseña
        </label>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;