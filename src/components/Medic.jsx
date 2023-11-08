import axios from "axios";
import { useEffect, useState } from "react";

export const Medic = () => {
  const id = localStorage.getItem("id");

  const [shifts, setShifts] = useState([]);
  const [showShifts, setShowShifts] = useState(false);

  const toggleShifts = () => {
    setShowShifts(!showShifts);
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
          <li className="text-white font-bold py-2 px-4 rounded-md relative select-none">
            <span>Schedule</span>
          </li>
          {/* Agregar una autenticacion si state.permission = true */}
          {/* <li>Post article</li> */}
        </ul>
      </nav>

      {showShifts && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5">
          {shifts.map((shift) => (
            <div
              key={shift.id}
              className="bg-sky-500 rounded-lg shadow-md p-4 border border-gray-600"
            >
              <h2 className="text-white font-bold text-xl">Patient: {shift.patientName}</h2>
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
    </div>
  );
};
