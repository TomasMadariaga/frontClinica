import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom";

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

  const navigate = useNavigate();

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.type === "date" && value) {
      const date = new Date(value);
      const formattedDate = date.toISOString().substring(0, 10);
      value = formattedDate;
    }

    if (e.target.name === "planId") {
      value = parseInt(value, 10); 
    }

    if (e.target.name === "dni") {
      value = parseInt(value, 10); 
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
      navigate('/')
      console.log("Registro exitoso:", response.data);
    } catch (error) {
      console.error("Error en el registro:", error);
      console.log("Respuesta del servidor:", error.response.data);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-teal-500 rounded-lg shadow-lg my-2">
      <h2 className="text-2xl font-semibold mb-6">Create an account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label htmlFor="name" className="block font-medium">
          Name:
        </label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="lastname" className="block font-medium">
          Lastname:
        </label>
        <input
          type="text"
          placeholder="Lastname"
          id="lastname"
          name="lastname"
          required
          value={formData.lastname}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="birthdate" className="block font-medium">
          Birthdate
        </label>
        <input
          type="date"
          placeholder="Birthdate"
          id="birthdate"
          name="birthdate"
          required
          value={formData.birthdate}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="dni" className="block font-medium">
          ID:
        </label>
        <input
          type="number"
          placeholder="ID"
          id="dni"
          name="dni"
          required
          value={formData.dni}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="planId" className="block font-medium">
          Health plan:
        </label>
        <select id="planId" name="planId" value={formData.planId} required onChange={handleChange}>
          <option>Select a Plan</option>
          <option value="1">Classic $399</option>
          <option value="2">Family $699</option>
        </select>

        <label htmlFor="email" className="block font-medium">
          Email:
        </label>
        <input
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <label htmlFor="password" className="block font-medium">
          Password:
        </label>
        <input
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default RegisterPatient;
