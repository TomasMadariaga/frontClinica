import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";

export const Admin = () => {
  const { state } = useAuth();
  const [showUsers, setShowUsers] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [newPlan, setNewPlan] = useState({ type: "", price: "" });
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de usuarios:", error);
      });

    axios
      .get("http://localhost:3000/planes")
      .then((response) => {
        setPlans(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de planes:", error);
      });
  }, []);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
    setShowPlans(false);
  };

  const togglePlans = () => {
    setShowPlans(!showPlans);
    setShowUsers(false);
  };

  const startCreatingPlan = () => {
    if (isCreatingPlan) {
      setIsCreatingPlan(false)
    } else {
      setIsCreatingPlan(true)
    }
  };

  const handleEditUser = (userIndex, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex][field] = value;
    setUsers(updatedUsers);
    console.log(updatedUsers[userIndex]);
  };

  const handleEditPlan = (planIndex, field, value) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex][field] = value;
    setPlans(updatedPlans);
  };

  const updateUserData = async (user) => {
    const { id, ...userData } = user;
    await axios
      .put(`http://localhost:3000/auth/${user.id}`, userData)
      .then((response) => {
        console.log(response.data);
        alert(`Usuario editado exitosamente`);
      })
      .catch((error) => {
        console.error("Error al actualizar el usuario:", error);
      });
  };

  const updatePlanData = async (plan) => {
    const { id, ...planData } = plan;
    await axios
      .put(`http://localhost:3000/planes/${plan.id}`, planData)
      .then((response) => {
        console.log(response.data);
        alert(`Plan editado exitosamente`);
      })
      .catch((error) => {
        console.error("Error al actualizar el plan:", error);
      });
  };

  const createNewPlan = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/planes",
        newPlan
      );
      console.log(response.data)
      setPlans([...plans, response.data]); // Agregar el nuevo plan a la lista
      setIsCreatingPlan(false); // Salir del modo de creación
      setNewPlan({ type: "", price: "", hospitalId: 1 }); // Restablecer los campos
    } catch (error) {
      console.error("Error al crear el plan:", error);
      // console.log(plans)
    }
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      axios.defaults.headers.common["Authorization"] = `${state.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state]);

  if (
    (state.isAuthenticated && state.role === "admin") ||
    (state.isAuthenticated && state.role === "superadmin")
  ) {
    return (
      <div className="flex min-h-screen">
        <nav className="w-64 bg-gray-700 text-white p-4">
          <ul className="space-y-2">
            <li className="group">
              <button onClick={toggleUsers} className="flex items-center">
                <span className="text-lg">Usuarios</span>
              </button>
            </li>
            <li className="group">
              <Link className="flex items-center">
                <span className="text-lg">Turnos</span>
              </Link>
            </li>
            <li className="group">
              <button onClick={togglePlans} className="flex items-center">
                <span className="text-lg">Planes</span>
              </button>
            </li>
            <li className="group">
              <Link className="flex items-center">
                <span className="text-lg">Historias Clínicas</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}

        <div className="p-4">
          <div>
            <div>
              {/* Contenido principal */}
              {showUsers && (
                <div className="bg-gray-700 px-4 py-2 border rounded-lg">
                  <h2 className="font-sans font-bold text-white text-center py-4">
                    Lista de Usuarios
                  </h2>
                  <div>
                    {users.map((user, index) => (
                      <div key={user.id} className="flex gap-5 py-2">
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus:border-blue-500 dark:text-gray-500"
                          value={user.name}
                          onChange={(e) =>
                            handleEditUser(index, "name", e.target.value)
                          }
                        ></input>
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus:border-blue-500 dark:text-gray-500"
                          value={user.email}
                          onChange={(e) =>
                            handleEditUser(index, "email", e.target.value)
                          }
                        ></input>
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus:border-blue-500 dark:text-gray-500"
                          value={user.password}
                          onChange={(e) =>
                            handleEditUser(index, "password", e.target.value)
                          }
                        ></input>
                        <select
                          className="text-white w-full px-3 py-2 border rounded-lg focus-border-blue-500 dark:text-gray-500"
                          value={user.role}
                          onChange={(e) =>
                            handleEditUser(index, "role", e.target.value)
                          }
                          disabled={user.role === "superadmin"}
                        >
                          <option value="patient">Patient</option>
                          <option value="medic">Medic</option>
                          {state.role === "superadmin" && (
                            <option value="admin">Admin</option>
                          )}
                          {user.role === "superadmin" && (
                            <option value="superadmin" disabled>
                              Superadmin
                            </option>
                          )}
                        </select>
                        <button
                          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                          onClick={() => updateUserData(user)}
                        >
                          Cambiar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {showPlans && (
                <div className="bg-gray-700 px-4 py-2 border rounded-lg">
                  <h2 className="font-sans font-bold text-white text-center py-4">
                    Lista de Planes
                  </h2>
                  <div>
                    {plans.map((plan, index) => (
                      <div key={plan.id} className="flex gap-5 py-2">
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus-border-blue-500 dark:text-gray-500"
                          value={plan.type}
                          onChange={(e) =>
                            handleEditPlan(index, "type", e.target.value)
                          }
                        ></input>
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus-border-blue-500 dark:text-gray-500"
                          value={plan.price}
                          onChange={(e) =>
                            handleEditPlan(index, "price", e.target.value)
                          }
                        ></input>
                        <button
                          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                          onClick={() => updatePlanData(plan)}
                        >
                          Cambiar
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-blue-400 text-white font-semibold py-2 rounded-lg hover:bg-blue-500" onClick={startCreatingPlan}>Crear Plan</button>
                  {isCreatingPlan && (
                    <div className="bg-gray-700 px-4 py-2 rounded-lg">
                      <h2 className="font-sans font-bold text-white text-center py-4">
                        Crear Nuevo Plan
                      </h2>
                      <div className="flex gap-5 py-2">
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus-border-blue-500 dark:text-gray-500"
                          placeholder="Type"
                          value={newPlan.type}
                          onChange={(e) =>
                            setNewPlan({
                              ...newPlan,
                              type: e.target.value,
                            })
                          }
                        ></input>
                        <input
                          className="text-white w-full px-3 py-2 border rounded-lg focus-border-blue-500 dark:text-gray-500"
                          placeholder="Price"
                          value={newPlan.price}
                          onChange={(e) =>
                            setNewPlan({
                              ...newPlan,
                              price: e.target.value,
                            })
                          }
                        ></input>
                        <button
                          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                          onClick={createNewPlan}
                        >
                          Enviar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Aquí coloca el contenido principal de tu panel de administración */}
        </div>
      </div>
    );
  } else if (state.isAuthenticated && state.role !== "admin") {
    // Usuario autenticado, pero no tiene el rol de administrador
    return <div>Acceso denegado. No tienes permiso para ver esta página.</div>;
  } else {
    // Usuario no autenticado, muestra el componente de inicio de sesión
    return <Login />;
  }
};
