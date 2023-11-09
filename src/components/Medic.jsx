import axios from "axios";
import { useEffect, useState } from "react";

export const Medic = () => {
  const id = localStorage.getItem("id");

  const [shifts, setShifts] = useState([]);
  const [showShifts, setShowShifts] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [selectedHour, setSelectedHour] = useState("");
  const [newHour, setNewHour] = useState("");
  const [workingHours, setWorkingHours] = useState({
    startTime: schedule.startTime || "",
    endTime: schedule.endTime || "",
  });
  const [updateMessage, setUpdateMessage] = useState("");

  const toggleShifts = () => {
    setShowShifts(!showShifts);
    setShowSchedule(false);
  };

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
    setShowShifts(false);
  };

  const calculateEndTime = (startTime) => {
    const startDateTime = new Date(`2000-01-01T${startTime}`);

    const endDateTime = new Date(startDateTime.getTime() + 8 * 60 * 60 * 1000);

    const endTime = endDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return endTime;
  };

  const handleGuardarClick = () => {
    setSelectedHour(newHour);

    const endTime = calculateEndTime(newHour);
    setWorkingHours({ startTime: newHour, endTime });

    axios
      .put(`http://localhost:3000/medicos/${id}`, {
        startTime: newHour,
        endTime: endTime,
      })
      .then((response) => {
        console.log("Horario cambiado con éxito", response.data);
        setUpdateMessage("¡Horario actualizado con éxito!");
        setTimeout(() => setUpdateMessage(""), 5000);
      })
      .catch((error) => {
        console.error("Error al hacer el PATCH", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/turnos/user-id/${id}`)
      .then((response) => {
        console.log(response.data);
        setShifts(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los turnos", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/medicos/${id}`)
      .then((response) => {
        console.log("Tipo de response.data:", typeof response.data);
        console.log("Contenido de response.data:", response.data);
        setSchedule(response.data);

        const { startTime, endTime } = response.data;
        const workingHours = {
          startTime: startTime || "",
          endTime: endTime || "",
        };
        setWorkingHours(workingHours);
      })
      .catch((error) => {
        console.error("Error al obtener el horario", error);
      });
  }, [id]);

  useEffect(() => {
    if (selectedHour) {
      const endTime = calculateEndTime(selectedHour);
      setWorkingHours({ startTime: selectedHour, endTime });

      axios
        .put(`http://localhost:3000/medicos/${id}`, {
          startTime: selectedHour,
          endTime: endTime,
        })
        .then((response) => {
          console.log("Horario cambiado con éxito", response.data);
        })
        .catch((error) => {
          console.error("Error al hacer el PATCH", error);
        });
    }
  }, [selectedHour, id]);

  return (
    <div className="flex flex-col">
      <nav className="w-full justify-center bg-teal-600 my-0.5 py-1">
        <ul className="flex flex-row justify-center gap-3">
          <li
            className={`relative py-2 px-4 rounded-md cursor-pointer transition-colors text-white font-bold select-none ${
              showShifts ? "bg-gray-700 text-gray-100" : ""
            }`}
            onClick={toggleShifts}
          >
            <span>Shifts</span>
          </li>
          <li
            className={`relative py-2 px-4 rounded-md cursor-pointer transition-colors text-white font-bold select-none ${
              showSchedule ? "bg-gray-700 text-gray-100" : ""
            }`}
            onClick={toggleSchedule}
          >
            <span>Schedule</span>
          </li>
        </ul>
      </nav>

      {showShifts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-sky-500 rounded-lg shadow-md p-4 border border-gray-600"
            >
              <h2 className="text-white font-bold text-xl">
                Patient: {shift.patientName}
              </h2>
              <p className="text-white">
                Day: {new Date(shift.startDate).toLocaleDateString()}
              </p>
              <p className="text-white">
                Start: {new Date(shift.startDate).toLocaleTimeString()}
              </p>
              <p className="text-white">
                Finish: {new Date(shift.endDate).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {showSchedule && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
          <div className="bg-sky-500 rounded-lg shadow-md p-4 border border-gray-600">
            <h2 className="text-white font-bold text-xl">Hora de inicio</h2>
            <label className="text-white">Eliga la hora: </label>
            <select
              value={newHour}
              onChange={(e) => setNewHour(e.target.value)}
            >
              <option>Seleccionar...</option>
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
            </select>
            <button
              onClick={handleGuardarClick}
              className="p-4 mt-8 ml-3 rounded-lg text-center text-sm font-semibold leading-4 text-white bg-sky-300 hover:bg-sky-400 shadow-md"
            >
              Guardar
            </button>
          </div>
          <div className="bg-sky-500 rounded-lg shadow-md p-4 border border-gray-600">
            <h2 className="text-white font-bold text-xl">Horas de trabajo</h2>
            <p className="text-white pt-4">
              Hora de ingreso: {workingHours.startTime}
            </p>
            <p className="text-white">Hora de salida: {workingHours.endTime}</p>
            {updateMessage && (
              <p className="text-white mt-2">{updateMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
