import { useState } from "react";
import axios from "axios";

const RegisterPatient = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
    birthdate: "",
    dni: "",
    planId: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.type === "date" && value) {
      // Formatear la fecha al formato "YYYY-MM-DD"
      const date = new Date(value);
      const formattedDate = date.toISOString().substring(0, 10);
      value = formattedDate;
    }

    if (e.target.name === "planId") {
      value = parseInt(value, 10); // Asegurarse de que sea un número base 10
    }

    if (e.target.name === "dni") {
      value = parseInt(value, 10); // Asegurarse de que sea un número base 10
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos que se enviarán al servidor:", formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register/patient",
        formData
      );
      console.log("Registro exitoso:", response.data);
    } catch (error) {
      console.error("Error en el registro:", error);
      console.log("Respuesta del servidor:", error.response.data);
    }
  };

  return (
    <div>
      <h2>Registro de Paciente</h2>
      
      <label htmlFor="name">Nombre:</label>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="lastname">Apellido:</label>
        <input
          type="text"
          placeholder="Apellido"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="birthdate">Fecha de Nacimiento:</label>
        <input
          type="date"
          placeholder="Fecha de nacimiento"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="dni">DNI:</label>
        <input
          type="number"
          placeholder="DNI"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="planId">Plan de Salud:</label>
        <select name="planId" value={formData.planId} onChange={handleChange}>
          <option>Seleccione un Plan</option>
          <option value="1">Plan Clasico</option>
          <option value="2">Plan Familiar</option>
          {/* Agrega más opciones según tus necesidades */}
        </select>

        <br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="Contraseña"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPatient;