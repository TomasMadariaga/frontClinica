import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";

export const Profile = () => {
  const {
    state: { role },
  } = useAuth();
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const [user, setUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [plans, setPlans] = useState("");
  const [editedUser, setEditedUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editedPatient, setEditedPatient] = useState({
    patientName: "",
    patientLastname: "",
    dni: "",
    birthdate: "",
    planId: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name in editedPatient) {
      setEditedPatient((prevEditedPatient) => ({
        ...prevEditedPatient,
        [name]: value,
      }));
    } else if (name in editedUser) {
      setEditedUser((prevEditedUser) => ({
        ...prevEditedUser,
        [name]: value,
      }));
    }
  };

  const handleSaveClick = async () => {
    try {
      const birthdateString = editedPatient.birthdate ?? "";
      const birthdate = new Date(birthdateString.split("T")[0]);
      const birthdateISO = birthdate.toISOString().split("T")[0];
      const numberDni = parseInt(editedPatient.dni);
      const numberPlanId = parseInt(editedPatient.planId);

      editedPatient.planId = numberPlanId;
      editedPatient.dni = numberDni;
      editedPatient.birthdate = birthdateISO;

      const responseUser = await axios.put(
        `http://localhost:3000/auth/${userId}`,
        editedUser
      );

      const patientName = editedUser.name;
      editedPatient.patientName = patientName;
      const responsePatient = await axios.put(
        `http://localhost:3000/pacientes/${user.patientId}`,
        editedPatient
      );
      toast.success("Datos cambiados con exito");
      setIsEditing(false);
      localStorage.setItem("name", editedUser.name);
    } catch (error) {
      toast.error("Error al cambiar los datos");
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/users/${id}`).then((response) => {
      setUser(response.data[0]);
      console.log(userId, id)
    }),
      axios.get("http://localhost:3000/planes").then((response) => {
        setPlans(response.data);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setEditedUser({
        name: user.name,
        email: user.email,
        password: user.password,
      });

      setEditedPatient({
        patientName: user.name,
        patientLastname: user.patientLastname,
        dni: user.dni,
        birthdate: user.birthdate,
        planId: user.planId,
      });
    }
  }, [user]);

  const hasPermissionToView = () => {
    return (
      (id === userId)
    );
  };

  if (!hasPermissionToView()) {
    return (
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-md shadow-md mt-8 my-3">
        <p className="text-red-500 text-2xl font-semibold">
          Error al encontrar el perfil
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md my-8">
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-4 text-blue-500">User Profile</h2>
      <div className="mb-4 space-y-2">
        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">Name:</label>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          ) : (
            <div className="w-2/3">{editedUser.name}</div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">Lastname:</label>
          {isEditing ? (
            <input
              type="text"
              name="patientLastname"
              value={editedPatient.patientLastname}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          ) : (
            <div className="w-2/3">
              {editedPatient.patientLastname}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">ID:</label>
          {isEditing ? (
            <input
              type="number"
              name="dni"
              value={editedPatient.dni}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          ) : (
            <div className="w-2/3">{editedPatient.dni}</div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">Birthdate:</label>
          {isEditing ? (
            <input
              type="date"
              name="birthdate"
              value={
                new Date(editedPatient.birthdate).toISOString().split("T")[0]
              }
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          ) : (
            <div className="w-2/3">
              {new Date(editedPatient.birthdate).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">Email:</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          ) : (
            <div className="w-2/3">{editedUser.email}</div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">Password:</label>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={editedUser.email}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            />
          ) : (
            <div className="w-2/3">
              <span className="text-gray-500">password</span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <label className="w-1/3 text-gray-700 font-bold">Health Plan:</label>
          {isEditing ? (
            <select
              name="planId"
              value={editedPatient.planId}
              onChange={handleInputChange}
              className="border rounded-lg p-2 w-full"
            >
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.type}
                </option>
              ))}
            </select>
          ) : (
            <div className="w-2/3">{user.type}</div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        {isEditing ? (
          <>
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
              onClick={handleSaveClick}
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-600"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};