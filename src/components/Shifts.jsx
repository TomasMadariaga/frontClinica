import React, { useState, useEffect } from "react";
import axios from "axios";

function Shifts() {
  const [medicId, setMedicId] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState(null);
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/medicos")
      .then((response) => {
        console.log("Datos de los médicos:", response.data);
        setMedicos(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos de médicos:", error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      decodeToken(token);
    }
  }, []);

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Decodificado del token:", payload);

      if (payload && payload.id) {
        setId(payload.id);
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }
  };

  const solicitarTurno = async (e) => {
    e.preventDefault();

    console.log("medicId:", medicId);
    console.log("id:", id);

    const numericMedicId = parseInt(medicId, 10);
    const numericId = parseInt(id, 10);

    if (Number.isNaN(numericMedicId) || Number.isNaN(numericId)) {
      console.error("Valores de medicId o id no válidos");
    } else {
      try {
        const response = await axios.post("http://localhost:3000/turnos", {
          medicId: numericMedicId,
          date,
          id: numericId,
        });

        console.log("Cita programada con éxito:", response.data);
      } catch (error) {
        console.error("Error al programar la cita:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <form
        onSubmit={solicitarTurno}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="medicId"
            className="block text-gray-700 font-semibold"
          >
            Médico:
          </label>
          <select
            value={medicId}
            onChange={(e) => setMedicId(e.target.value)}
            id="medicId"
            className="form-select mt-1 block w-full"
          >
            <option>Seleccione un medico</option>
            {medicos.map((medico) => (
              <option key={medico.id} value={medico.id}>
                {medico.medicName} {medico.medicLastname}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 font-semibold">
            Fecha:
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            id="date"
            className="form-input mt-1 block w-full"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Solicitar Turno
          </button>
        </div>
      </form>
    </div>
  );
}

export default Shifts;
