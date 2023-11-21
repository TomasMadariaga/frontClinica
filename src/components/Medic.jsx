import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";

export const Medic = () => {
  const id = localStorage.getItem("id");

  const [shifts, setShifts] = useState([]);
  const [showShifts, setShowShifts] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [newHour, setNewHour] = useState("");
  const [workingHours, setWorkingHours] = useState({
    startTime: schedule.startTime || "",
    endTime: schedule.endTime || "",
  });

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
    const endTime = calculateEndTime(newHour);
    setWorkingHours({ startTime: newHour, endTime });

    axios
      .put(`http://localhost:3000/medicos/${id}`, {
        startTime: newHour,
        endTime: endTime,
      })
      .then((response) => {
        toast.success("Horario guardado correctamente");
      })
      .catch((error) => {
        toast.error("Error al cambiar su horario");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/turnos/user-id/${id}`)
      .then((response) => {
        setShifts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los turnos", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/medicos/${id}`)
      .then((response) => {
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
  }, []);

  return (
    <div className="flex flex-col">
      <ToastContainer />
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
              className="flex justify-between bg-sky-500 rounded-lg shadow-md p-4 border border-gray-600 relative"
            >
              <div>
                <h2 className="text-white font-bold text-xl">
                  Patient: {shift.patientName}
                </h2>
                <p className="text-white">
                  Day: {new Date(shift.startDate).toLocaleDateString()}
                </p>
                <p className="text-white">
                  Start: {DateTime.fromISO(shift.startDate).toFormat("HH:mm")}
                </p>
                <p className="text-white">
                  Finish: {DateTime.fromISO(shift.endDate).toFormat("HH:mm")}
                </p>
              </div>
              <Link to={{ pathname: `/historia-clinica/${shift.userId}` }}>
                <svg
                  fill="#ffffff"
                  height="30px"
                  width="30px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512.00 512.00"
                  xmlSpace="preserve"
                  stroke="#ffffff"
                  strokeWidth="5.632"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M387.904,267.323h-24.814c-4.33,0-7.839,3.51-7.839,7.839c0,4.329,3.509,7.839,7.839,7.839h24.814 c4.33,0,7.839-3.51,7.839-7.839C395.743,270.833,392.234,267.323,387.904,267.323z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M337.297,267.323h-213.2c-4.329,0-7.839,3.51-7.839,7.839c0,4.329,3.51,7.839,7.839,7.839h213.2 c4.33,0,7.839-3.51,7.839-7.839C345.136,270.833,341.627,267.323,337.297,267.323z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M387.904,323.996H124.097c-4.329,0-7.839,3.51-7.839,7.839c0,4.33,3.51,7.839,7.839,7.839h263.806 c4.33,0,7.839-3.51,7.839-7.839S392.234,323.996,387.904,323.996z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M387.904,380.669H124.097c-4.329,0-7.839,3.51-7.839,7.839c0,4.329,3.51,7.839,7.839,7.839h263.806 c4.33,0,7.839-3.51,7.839-7.839C395.743,384.178,392.234,380.669,387.904,380.669z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M387.904,437.342H320.41c-4.33,0-7.839,3.51-7.839,7.839s3.509,7.839,7.839,7.839h67.494c4.33,0,7.839-3.51,7.839-7.839 S392.234,437.342,387.904,437.342z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M311.163,155.019h-30.042v-30.042c0-4.329-3.51-7.839-7.839-7.839h-34.564c-4.329,0-7.839,3.51-7.839,7.839v30.042 h-30.042c-4.329,0-7.839,3.51-7.839,7.839v34.564c0,4.329,3.51,7.839,7.839,7.839h30.042v30.042c0,4.329,3.51,7.839,7.839,7.839 h34.564c4.33,0,7.839-3.51,7.839-7.839V205.26h30.042c4.33,0,7.839-3.51,7.839-7.839v-34.564 C319.002,158.528,315.493,155.019,311.163,155.019z M303.324,189.582h-30.042c-4.33,0-7.839,3.51-7.839,7.839v30.042h-18.886 v-30.042c0-4.329-3.51-7.839-7.839-7.839h-30.042v-18.886h30.042c4.329,0,7.839-3.51,7.839-7.839v-30.042h18.886v30.042 c0,4.329,3.509,7.839,7.839,7.839h30.042V189.582z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M427.468,52.442h-69.43V31.136c0-4.329-3.509-7.839-7.839-7.839h-54.708v-0.264C295.492,10.333,285.159,0,272.46,0h-32.92 c-12.7,0-23.032,10.333-23.032,23.033v0.264h-54.708c-4.329,0-7.839,3.51-7.839,7.839v21.305h-69.43 c-4.329,0-7.839,3.51-7.839,7.839v98.124c0,4.329,3.51,7.839,7.839,7.839s7.839-3.51,7.839-7.839V68.12h61.59v21.764 c0,4.329,3.51,7.839,7.839,7.839h188.4c4.33,0,7.839-3.51,7.839-7.839V68.12h61.591v428.203H92.37V184.229 c0-4.329-3.51-7.839-7.839-7.839s-7.839,3.51-7.839,7.839v319.932c0,4.329,3.51,7.839,7.839,7.839h342.937 c4.33,0,7.839-3.51,7.839-7.839V60.281C435.307,55.952,431.799,52.442,427.468,52.442z M169.639,82.045V60.281V38.975h54.708 c4.329,0,7.839-3.51,7.839-7.839v-8.103c0-4.055,3.299-7.355,7.354-7.355h32.92c4.055,0,7.354,3.3,7.354,7.355v8.103 c0,4.329,3.509,7.839,7.839,7.839h54.708v21.305v21.764H169.639z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      )}

      {showSchedule && (
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2 gap-12 lg:gap-8 py-24 px-4 sm:px-6 lg:px-24">
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
              Hora de ingreso:{" "}
              {DateTime.fromISO(workingHours.startTime).toFormat("HH:mm")}
            </p>
            <p className="text-white">
              Hora de salida:{" "}
              {DateTime.fromISO(workingHours.endTime).toFormat("HH:mm")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
