import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Patient = () => {
  const [medics, setMedics] = useState([]);
  const [medicId, setMedicId] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleCreateTurn = async (e) => {
    e.prevent.default();
    try {
      const data = {
        patientId: number,
        medicId: number,
        startDate: Date,
        endDate: Date,
      };

      const response = await axios.post("http://localhost:3000/turnos", data);
      console.log("Turno creado:", response.data);
    } catch (error) {
      console.error("Error al crear el turno:", error);
    }
  };

  const filterDate = date => {
    return date.getDay() !== 2 && date.getDay() !== 5;
  };


  useEffect(() => {
    axios
      .get("http://localhost:3000/medicos")
      .then((response) => {
        setMedics(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de medicos:", error);
      });
  }, []);

  return (
    <div>
      <h2>Crear Turno</h2>
      <form onSubmit={handleCreateTurn}>
        <label htmlFor="medicId">Seleccionar médico:</label>
        <select
          id="medicId"
          value={medicId}
          onChange={(e) => setMedicId(e.target.value)}
        >
          <option value="">Selecciona un médico</option>
          {medics.map((medic) => (
            <option key={medic.id} value={medic.id}>
              {medic.medicName} - {medic.specialty}
            </option>
          ))}
        </select>
        {/* <DtPicker value={selectedDate} onChange={handleDateChange}/> */}
        <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        filterDate={filterDate}
        dateFormat="yyyy-MM-dd"
      />


        <button type="submit">Crear turno</button>
      </form>
    </div>
  );
};
