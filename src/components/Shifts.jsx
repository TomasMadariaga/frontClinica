import axios from "axios";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

export const Shifts = () => {
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const [shifts, setShifts] = useState([]);
  const {
    state: { role },
  } = useAuth();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/turnos/patient-user-id/${userId}`)
      .then((response) => {
        setShifts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const hasPermissionToView = () => {
    return role === "patient" && id === userId;
  };

  if (!shifts || !hasPermissionToView()) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md mt-8 my-3">
        <p className="text-red-500 text-2xl font-semibold">
          This patient has no medical appointments
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-md mx-auto bg-white shadow-lg rounded-md p-4 my-4">
      <h2 className="text-3xl font-bold text-blue-500 mb-4">
        Your medical shifts
      </h2>

      <ul className="flex flex-col space-y-4">
        {shifts.map((shift) => (
          <li
            className="flex flex-col border-b-2 border-gray-200 pb-4"
            key={shift.id}
          >
            <div className="flex items-center justify-between mb-2 py-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900">
                    {shift.medicName}
                  </h3>
                  <p className="text-gray-600 capitalize">{shift.specialty}</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <p className="text-gray-600 font-semibold">Time: </p>
                <p className="text-gray-600">
                  {DateTime.fromISO(shift.startDate).toFormat("HH:mm")} -
                  {DateTime.fromISO(shift.endDate).toFormat("HH:mm")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start mb-2">
              <p className="text-gray-600 font-semibold">Date: </p>
              <p className="ml-4 text-gray-600">
                {DateTime.fromISO(shift.startDate).toFormat("dd-MM-yyyy")}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
