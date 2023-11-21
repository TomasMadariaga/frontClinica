import axios from "axios";
import { useEffect, useState } from "react";

export const Profile = () => {
  const id = localStorage.getItem("id");
  const [user, setUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [plans, setPlans] = useState("");
  const [editedUser, setEditedUser] = useState({
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
  });
  const [editedPatient, setEditedPatient] = useState({
    patientName: user.patientName || "",
    patientLastname: user.patientLastname || "",
    dni: user.dni || "",
    birthdate: user.birthdate || "",
    planId: user.planId || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (isEditing) {
      if (name in editedUser) {
        setEditedUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      } else if (name in editedPatient) {
        if (name === "birthdate") {
          const formattedDate = new Date(value).toISOString().split("T")[0];
          setEditedPatient((prevPatient) => ({
            ...prevPatient,
            [name]: formattedDate,
          }));
        } else {
          setEditedPatient((prevPatient) => ({
            ...prevPatient,
            [name]: value,
          }));
        }
      }
    } else {
      // Si no estás editando, refleja los valores actuales de user
      if (name in editedUser) {
        setEditedUser((prevUser) => ({
          ...prevUser,
          [name]: user[name],
        }));
      } else if (name in editedPatient) {
        setEditedPatient((prevPatient) => ({
          ...prevPatient,
          [name]: user[name],
        }));
      }
    }
  };

  const handleSaveClick = async () => {
    try {
      // Campos específicos para el usuario
      const userFields = {
        name: editedUser.name ?? user.name,
        email: editedUser.email ?? user.email,
        password: editedUser.password ?? user.password,
      };

      // Campos específicos para el paciente
      const patientFields = {
        patientLastname: editedPatient.patientLastname ?? user.patientLastname,
        dni: editedPatient.dni ?? user.dni,
        planId: editedPatient.planId ?? user.planId,
        birthdate: editedPatient.birthdate ?? user.birthdate,
      };

      // Actualizar editedUser con los campos modificados del usuario
      setEditedUser((prevUser) => ({ ...prevUser, ...userFields }));

      // Actualizar editedPatient con los campos modificados del paciente
      setEditedPatient((prevPatient) => ({ ...prevPatient, ...patientFields }));

      console.log('userFields:', userFields)
      console.log('editedUser:', editedUser)
      // Enviar la solicitud PUT para el usuario
      const responseUser = await axios.put(
        `http://localhost:3000/auth/${user.id}`,
        userFields
      );
      console.log(
        "Cambios de usuario guardados exitosamente:",
        responseUser.data
      );

      // Enviar la solicitud PUT para el paciente
      const responsePatient = await axios.put(
        `http://localhost:3000/pacientes/${user.patientId}`,
        patientFields
      );
      setEditedPatient(responsePatient.data);
      console.log(
        "Cambios de paciente guardados exitosamente:",
        responsePatient.data
      );
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/auth/users/${id}`).then((response) => {
      setUser(response.data[0]);
    }),
      axios.get("http://localhost:3000/planes").then((response) => {
        setPlans(response.data);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md my-8">
      <h2 className="text-3xl font-bold mb-4 text-blue-500">User Profile</h2>
      <div className="mb-4">
        <p className="text-gray-700">
          <span className="font-bold">Name: </span>
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          ) : (
            user.name
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Lastname: </span>
          {isEditing ? (
            <input
              type="text"
              name="patientLastname"
              value={user.patientLastname}
              onChange={handleInputChange}
            />
          ) : (
            user.patientLastname
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">ID: </span>
          {isEditing ? (
            <input
              type="number"
              name="dni"
              value={user.dni}
              onChange={handleInputChange}
            />
          ) : (
            user.dni
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Birthdate: </span>
          {isEditing ? (
            <input
              type="date"
              name="birthdate"
              value={new Date(user.birthdate).toISOString().split("T")[0]}
              onChange={handleInputChange}
            />
          ) : (
            new Date(user.birthdate).toLocaleDateString()
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Email: </span>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          ) : (
            user.email
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Password: </span>
          {isEditing ? (
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
          ) : (
            <span className="text-gray-500">password</span>
          )}
        </p>
        <p className="text-gray-700">
          <span className="font-bold">Health Plan: </span>
          {isEditing ? (
            <select
              name="planId"
              value={user.planId}
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
            user.type
          )}
        </p>
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
