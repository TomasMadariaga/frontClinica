import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Payment } from "./Payment.jsx";

export const Patient = () => {
  document.title = "Shift";

  const [medics, setMedics] = useState([]);
  const [medicStartTime, setMedicStartTime] = useState("");
  const [medicEndTime, setMedicEndTime] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [time, setTime] = useState("");
  const [medicId, setMedicId] = useState("");
  const [workingDays, setWorkingDays] = useState([]);
  const [patient, setPatient] = useState("");
  const [plan, setPlan] = useState([]);
  const [patientsId, setPatientsId] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const IdUser = localStorage.getItem("id");
  const userId = parseInt(IdUser);

  const handleCreateTurn = async (e) => {
    e.preventDefault();

    if (patient.paymentStatus === false) {
      console.log(plan);
      toast.info("Complete su metodo de pago")
      setShowPayment(true);
    } else {
      try {
        const selectedMedic = medics.find(
          (medic) => medic.id === parseInt(medicId)
        );
        const selectedDate = startDate ? new Date(startDate) : new Date();
        const selectedTime = time ? time : "00:00";
        const [hours, minutes] = selectedTime.split(":");
        selectedDate.setHours(parseInt(hours), parseInt(minutes));

        const formattedDate = selectedDate.toISOString();

        const endDate = new Date(selectedDate.getTime() + 3600000);
        const formattedEndDate = endDate.toISOString();

        const data = {
          patientId: parseInt(patientsId),
          medicId: selectedMedic.id,
          startDate: formattedDate,
          endDate: formattedEndDate,
        };

        const response = await axios.post("http://localhost:3000/turnos", data);
        toast.success("Turno creado exitosamente!");
      } catch (error) {
        toast.error("Hubo un error al crear el turno");
        console.log(error);
      }
    }
  };

  const generateHoursArray = (startTime, endTime) => {
    const start = DateTime.fromFormat(startTime, "HH:mm:ss");
    const end = DateTime.fromFormat(endTime, "HH:mm:ss");

    const hours = [];

    let current = start;

    while (current <= end) {
      hours.push(current);
      current = current.plus({ hours: 1 });
    }

    return hours;
  };

  const handleMedicChange = (e) => {
    console.log(plan);
    const selectedMedic = medics.find(
      (medic) => medic.id === parseInt(e.target.value)
    );
    const { workingDays } = selectedMedic;
    const newWorkingDays = workingDays.map((day) => parseInt(day));
    setMedicId(selectedMedic.id);
    setMedicStartTime(selectedMedic.startTime);
    setMedicEndTime(selectedMedic.endTime);
    setWorkingDays(newWorkingDays);
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day == workingDays[0] || day == workingDays[1];
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
    axios
      .get(`http://localhost:3000/pacientes/usuario/${userId}`)
      .then((response) => {
        setPatient(response.data);
        setPatientsId(response.data.id);
      })
      .catch((error) => {
        console.error("Error al obtener al paciente:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/planes/${patient.planId}`)
      .then((response) => {
        setPlan(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, [patient]);

  return (
    <div className="flex items-center justify-center py-5 bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Crear Turno</h2>
        <form onSubmit={handleCreateTurn} className="max-w-md mx-auto">
          <div className="mb-4">
            <label
              htmlFor="medicId"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Seleccionar médico:
            </label>
            <select
              id="medicId"
              value={medicId}
              onChange={handleMedicChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            >
              <option value="">Selecciona un médico</option>
              {medics.map((medic) => (
                <option key={medic.id} value={medic.id}>
                  {medic.medicName} - {medic.specialty}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              filterDate={isWeekday}
              placeholderText="Selecciona un día laborable"
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Selecciona una hora:
            </label>
            <select
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            >
              <option value="">Selecciona una hora</option>
              {generateHoursArray(medicStartTime, medicEndTime).map(
                (hour, index) => (
                  <option key={index} value={hour.toFormat("HH:mm")}>
                    {hour.toFormat("HH:mm")}
                  </option>
                )
              )}
            </select>
          </div>
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
            Crear turno
          </button>
        </form>
      </div>
      {showPayment && (
        <div className="mx-5 bg-white p-4 shadow-lg rounded-md w-3/12">
          <Payment
            patient={patient}
            plan={plan}
            onPaymentComplete={(showPaymentStatus) =>
              setShowPayment(showPaymentStatus)
            }
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
