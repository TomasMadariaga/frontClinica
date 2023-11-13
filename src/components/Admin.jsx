import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";
import { DateTime } from "luxon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export const Admin = () => {
  const { state } = useAuth();
  const [showUsers, setShowUsers] = useState(true);
  const [showTurnos, setShowTurnos] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [showHistoriasClinicas, setShowHistoriasClinicas] = useState(false);
  const [showRegisterMedic, setShowRegisterMedic] = useState(false);
  const [showRegisterAdmin, setShowRegisterAdmin] = useState(false);
  const [showMedicalArticle, setShowMedicalArticle] = useState(false);
  const [isCreatingPlan, setIsCreatingPlan] = useState(false);
  const [editArticle, setEditArticle] = useState(null);
  const [newPlan, setNewPlan] = useState({
    type: "",
    price: "",
    hospitalId: "",
  });
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [medicalArticle, setMedicalArticle] = useState([]);

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

    axios
      .get("http://localhost:3000/turnos/info")
      .then((response) => {
        setTurnos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de turnos", error);
      });

    axios
      .get("http://localhost:3000/historias/info")
      .then((response) => {
        setHistorias(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de historias:", error);
      });

    axios
      .get("http://localhost:3000/articles/")
      .then((response) => {
        setMedicalArticle(response.data);
      })
      .catch((error) => {
        console.error("error al obtener los articulos", error);
      });
  }, []);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
    setShowPlans(false);
    setShowTurnos(false);
    setShowHistoriasClinicas(false);
    setShowRegisterMedic(false);
    setShowRegisterAdmin(false);
    setShowMedicalArticle(false);
  };

  const togglePlans = () => {
    setShowPlans(!showPlans);
    setShowUsers(false);
    setShowTurnos(false);
    setShowHistoriasClinicas(false);
    setShowRegisterMedic(false);
    setShowRegisterAdmin(false);
    setShowMedicalArticle(false);
  };

  const toggleTurnos = () => {
    setShowTurnos(!showTurnos);
    setShowUsers(false);
    setShowPlans(false);
    setShowHistoriasClinicas(false);
    setShowRegisterMedic(false);
    setShowRegisterAdmin(false);
    setShowMedicalArticle(false);
  };

  const toggleHistoriasClinicas = () => {
    setShowHistoriasClinicas(!showHistoriasClinicas);
    setShowUsers(false);
    setShowPlans(false);
    setShowTurnos(false);
    setShowRegisterMedic(false);
    setShowRegisterAdmin(false);
    setShowMedicalArticle(false);
  };

  const toggleRegister = () => {
    setShowRegisterMedic(!showRegisterMedic);
    setShowUsers(false);
    setShowPlans(false);
    setShowTurnos(false);
    setShowHistoriasClinicas(false);
    setShowRegisterAdmin(false);
    setShowMedicalArticle(false);
  };

  const toggleRegisterAdmin = () => {
    setShowRegisterAdmin(!showRegisterAdmin);
    setShowUsers(false);
    setShowPlans(false);
    setShowTurnos(false);
    setShowHistoriasClinicas(false);
    setShowRegisterMedic(false);
    setShowMedicalArticle(false);
  };

  const toggleArticles = () => {
    setShowMedicalArticle(!showMedicalArticle);
    setShowUsers(false);
    setShowPlans(false);
    setShowTurnos(false);
    setShowHistoriasClinicas(false);
    setShowRegisterMedic(false);
    setShowRegisterAdmin(false);
  };

  const startCreatingPlan = () => {
    if (isCreatingPlan) {
      setIsCreatingPlan(false);
    } else {
      setIsCreatingPlan(true);
    }
  };

  const [formDataMedic, setFormDataMedic] = useState({
    name: "",
    email: "",
    password: "",
    lastname: "",
    registrationNumber: "",
    specialty: "",
    workingDays: [],
    startTime: "",
    endTime: "",
  });

  const [formDataAdmin, setFormDataAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "registrationNumber") {
      value = parseInt(value, 10);
    }

    setFormDataMedic({
      ...formDataMedic,
      [e.target.name]: value,
    });
  };

  const handleChangeAdmin = (e) => {
    let value = e.target.value;

    setFormDataAdmin({
      ...formDataAdmin,
      [e.target.name]: value,
    });
  };

  const handleEditUser = (userIndex, field, value) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex][field] = value;
    setUsers(updatedUsers);
    console.log(updatedUsers[userIndex]);
  };

  const handleEditArticle = (articleIndex, field, value) => {
    const updatedArticle = [...medicalArticle];
    updatedArticle[articleIndex][field] = value;
    setMedicalArticle(updatedArticle);
    console.log(updatedArticle[articleIndex]);
  };

  const handleEditPlan = (planIndex, field, value) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex][field] = value;
    setPlans(updatedPlans);
  };

  const cancelEdit = () => {
    setEditArticle(null);
  };

  const handleWorkingDayChange = (event) => {
    const selectedDay = Number(event.target.value); 
    const updatedWorkingDays = [...formDataMedic.workingDays]; 

    if (event.target.checked) {
      updatedWorkingDays.push(selectedDay);
    } else {
      const index = updatedWorkingDays.indexOf(selectedDay);
      if (index !== -1) {
        updatedWorkingDays.splice(index, 1);
      }
    }

    setFormDataMedic({ ...formDataMedic, workingDays: updatedWorkingDays });
  };

  const updateMedicalArticle = async (editedArticle) => {
    const { id, creationDate, ...articleData } = editedArticle;
    try {
      const response = await axios.put(
        `http://localhost:3000/articles/${id}`,
        articleData
      );
      toast.success("Articulo medico editado correctamente")
    } catch (error) {
      toast.success("Error al editar el articulo")
    }
  };

  const handleSaveEditedArticle = (editedArticle) => {
    const updatePromise = updateMedicalArticle(editedArticle);

    updatePromise
      .then((response) => {
        const updatedMedicalArticles = medicalArticle.map((article) =>
          article.id === editedArticle.id ? editedArticle : article
        );

        setMedicalArticle(updatedMedicalArticles);

        setEditArticle(null);
      })
      .catch((error) => {
        console.error("Error al guardar el artículo médico:", error);
      });
  };

  const updateUserData = async (user) => {
    const { id, ...userData } = user;
    await axios
      .put(`http://localhost:3000/auth/${user.id}`, userData)
      .then((response) => {
        console.log(response.data);
        toast.success("Usuario editado correctamente")
      })
      .catch((error) => {
        toast.error("Error al editar el usuario")
      });
  };

  const updatePlanData = async (plan) => {
    try {
      const priceAsNumber = parseInt(plan.price);

      // Crea un nuevo objeto con 'price' como número
      const updatedPlanData = {
        type: plan.type,
        price: priceAsNumber,
        hospitalId: 1,
      };

      const response = await axios.put(
        `http://localhost:3000/planes/${plan.id}`,
        updatedPlanData
      );

      console.log(response.data);
      toast.success("Plan editado correctamente")
    } catch (error) {
      toast.error("Error al editar el plan")
    }
  };

  const createNewPlan = async () => {
    try {
      const priceAsNumber = parseInt(newPlan.price);

      const dataToSend = {
        type: newPlan.type,
        price: priceAsNumber,
        hospitalId: 1,
      };

      const response = await axios.post(
        "http://localhost:3000/planes",
        dataToSend
      );

      setPlans([...plans, response.data]);

      setIsCreatingPlan(false);
      setNewPlan({ type: "", price: "" });
      toast.success("Plan creado")
    } catch (error) {
      toast.error("Error al crear el plan")
    }
  };

  const deleteUser = async (userId) => {
    confirmAlert({title: 'Confirmar para borrar', message:"Estas seguro de borrar el usuario?", buttons: [
      {
        label: "Yes",
        onClick: async () => {try {
          await axios.delete(`http://localhost:3000/auth/${userId}`);
          const updatedUsers = users.filter((user) => user.id !== userId);
          setUsers(updatedUsers);
          toast.info("Usuario eliminado")
        } catch (error) {
          toast.error("Error al eliminar el usuario")
        }}
      },
      {
        label: "No"
      }
    ]})
    
  };

  const deletePlan = async (planId) => {
    confirmAlert({title: "Confirmar para borrar", message: "Estas seguro de borrar el plan?", buttons: [
      {
        label: "Yes",
        onClick: async () => {try {
          await axios.delete(`http://localhost:3000/planes/${planId}`);
          const updatedPlanes = plans.filter((plan) => plan.id !== planId);
          setPlans(updatedPlanes);
          toast.info("Plan eliminado")
        } catch (error) {
          toast.error("Error al eliminar el plan")
        }}
      },
      {
        label: "No"
      }
    ]})
    
  };

  const deleteShift = async (shiftId) => {
    confirmAlert({title: "Confirmar para borrar", message: "Estas seguro de borrar el turno medico?", buttons: [
      {
        label: "Yes",
        onClick: async () => {try {
          await axios.delete(`http://localhost:3000/turnos/${shiftId}`);
          const updatedShifts = turnos.filter((shift) => shift.id !== shiftId);
          setTurnos(updatedShifts);
          toast.info("Turno medico eliminado")
        } catch (error) {
          toast.error("Error al eliminar el turno medico")
        }}
      },
      {
        label: "No"
      }
    ]})
    
  };

  const deleteHistoriaClinica = async (historiaId) => {
    confirmAlert({title: "Confirmar para borrar", message: "Estas seguro de borrar la historia clinica?", buttons: [
      {
        label: "Yes",
        onClick: async () => {try {
          await axios.delete(`http://localhost:3000/historias/${historiaId}`);
    
          const updatedHistoria = historias.filter(
            (historia) => historia.id !== historiaId
          );
          setHistorias(updatedHistoria);
          toast.info("Historia clinica eliminada")
        } catch (error) {
          toast.error("Error al eliminar la historia clinica")
        }}
      },
      {
        label: "No"
      }
    ]})
    
  };

  const deleteArticle = async (articleId) => {
    confirmAlert({title: "Confirmar para borrar", message: "Estas seguro de borrar el articulo medico?", buttons: [
      {
        label: "Yes",
        onClick: async () => {try {
          await axios.delete(`http://localhost:3000/articles/${articleId}`);
    
          const updatedArticle = medicalArticle.filter(
            (medicalArticle) => medicalArticle.id !== articleId
          );
          setMedicalArticle(updatedArticle);
          toast.info("Articulo medico eliminado")
        } catch (error) {
          toast.error("Error al eliminar el articulo medico")
        }}
      },
      {
        label: "No"
      }
    ]})
    
  };

  const handleStartTimeChange = (event) => {
    const { name, value } = event.target;
    setFormDataMedic({
      ...formDataMedic,
      [name]: value,
    });
  };

  const handleEndTimeChange = (event) => {
    const { name, value } = event.target;
    setFormDataMedic({
      ...formDataMedic,
      [name]: value,
    });
  };

  const registerMedic = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register/medic",
        formDataMedic
      );
      toast.success("Medico registrado exitosamente")
    } catch (error) {
      toast.error("Error al registrar al medico")
    }
  };

  const registerAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/register/admin",
        formDataAdmin
      );
      toast.success("Admin registrado correctamente")
    } catch (error) {
      toast.error("Error al registrar el admin")
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
      <div className="flex w-full">
        <nav className="w-64 bg-gray-700 text-white min-h-screen p-4">
          <ul className="space-y-2">
            <li
              className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                showUsers ? "bg-blue-500 text-gray-100" : ""
              }`}
              onClick={toggleUsers}
            >
              <span className="text-lg">Users</span>
            </li>
            <li
              className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                showTurnos ? "bg-blue-500 text-gray-100" : ""
              }`}
              onClick={toggleTurnos}
            >
              <span className="text-lg">Shifts</span>
            </li>
            <li
              className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                showPlans ? "bg-blue-500 text-gray-100" : ""
              }`}
              onClick={togglePlans}
            >
              <span className="text-lg">Health Plans</span>
            </li>
            <li
              className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                showHistoriasClinicas ? "bg-blue-500 text-gray-100" : ""
              }`}
              onClick={toggleHistoriasClinicas}
            >
              <span className="text-lg">Clinic History</span>
            </li>
            <li
              className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                showMedicalArticle ? "bg-blue-500 text-gray-100" : ""
              }`}
              onClick={toggleArticles}
            >
              <span className="text-lg">Articles</span>
            </li>
            <li
              className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                showRegisterMedic ? "bg-blue-500 text-gray-100" : ""
              }`}
              onClick={toggleRegister}
            >
              <span className="text-lg">Register Medic</span>
            </li>
            {state.role === "superadmin" && (
              <li
                className={`group relative py-2 px-4 rounded-md cursor-pointer transition-colors ${
                  showRegisterAdmin ? "bg-blue-500 text-gray-100" : ""
                }`}
                onClick={toggleRegisterAdmin}
              >
                <span className="text-lg">Register Admin</span>
              </li>
            )}
          </ul>
        </nav>
        <div className="p-4 w-full">
          <ToastContainer/>
          {showUsers && (
            <div className="bg-gray-700 px-4 py-2 border rounded-lg">
              <h2 className="font-sans font-bold text-white text-center py-4">
                List of Users
              </h2>
              <div>
                {users.map((user, index) => (
                  <div key={user.id} className="flex gap-5 py-2">
                    <button
                      className="bg-red-500 w-72 text-white font-semibold py-2 rounded-full hover:bg-red-600"
                      onClick={() => deleteUser(user.id)}
                    >
                      <span className="text-lg">X</span>
                    </button>
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
                      placeholder="Password"
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
                      Edit
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showPlans && (
            <div className="bg-gray-700 px-4 py-2 border rounded-lg w-3/6">
              <h2 className="font-sans font-bold text-white text-center py-4">
                List of health plans
              </h2>
              <div>
                {plans.map((plan, index) => (
                  <div key={plan.id} className="flex gap-5 py-2">
                    <button
                      className="bg-red-500 w-40 text-white font-semibold py-2 rounded-full hover:bg-red-600"
                      onClick={() => deletePlan(plan.id)}
                    >
                      <span className="text-lg">X</span>
                    </button>
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
                      Edit
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="w-full bg-blue-400 text-white font-semibold py-2 my-1 rounded-lg hover:bg-blue-500"
                onClick={startCreatingPlan}
              >
                Create Plan
              </button>
              {isCreatingPlan && (
                <div className="bg-gray-700 px-4 py-2 rounded-lg">
                  <h2 className="font-sans font-bold text-white text-center py-4">
                    Create new Plan
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
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {showTurnos && (
            <div className="bg-gray-700 px-4 py-2 border rounded-lg w-3/6">
              <h2 className="font-sans font-bold text-white text-center py-4">
                List of Shifts
              </h2>
              <div>
                {turnos.map((turno) => (
                  <div
                    key={turno.id}
                    className="bg-gray-800 rounded-lg p-4 my-2"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-white text-lg font-semibold">
                          {turno.specialty}
                        </h3>
                      </div>
                      <button
                        className="bg-red-500 w-11 text-white font-semibold py-2 rounded-full hover:bg-red-600"
                        onClick={() => deleteShift(turno.id)}
                      >
                        <span className="text-lg">X</span>
                      </button>
                    </div>
                    <div className="flex mt-2">
                      <div className="w-1/3">
                        <h4 className="text-white text-sm font-semibold">
                          Medic
                        </h4>
                        <p className="text-white text-sm">{turno.medicName}</p>
                      </div>
                      <div className="w-1/3">
                        <h4 className="text-white text-sm font-semibold">
                          Patient
                        </h4>
                        <p className="text-white text-sm">
                          {turno.patientName}
                        </p>
                      </div>
                      <div className="w-1/3">
                        <h4 className="text-white text-sm font-semibold">
                          Date
                        </h4>
                        <p className="text-white text-sm">
                          Start:{" "}
                          {DateTime.fromISO(turno.startDate).toFormat(
                            "yyyy-MM-dd HH:mm"
                          )}
                        </p>
                        <p className="text-white text-sm">
                          End:{" "}
                          {DateTime.fromISO(turno.endDate).toFormat(
                            "yyyy-MM-dd HH:mm"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showHistoriasClinicas && (
            <div className="bg-gray-700 px-4 py-2 border rounded-lg w-2/6">
              <h2 className="font-sans font-bold text-white text-center py-4">
                Patient Medical Records
              </h2>
              <div>
                {/* Aquí puedes mapear las historias clínicas y mostrarlas en cards */}
                {historias.map((historia, index) => (
                  <div
                    key={historia.id}
                    className="bg-gray-800 rounded-lg p-4 my-2 flex gap-6"
                  >
                    {/* Contenido de la historia clínica */}
                    <h1 className="text-white text-lg font-bold my-3">
                      {historia.patientName}
                    </h1>
                    <ul className="flex flex-col gap-6">
                      <li>
                        <h2 className="font-semibold text-white">Symptoms</h2>
                        <p className="text-white text-sm w-4/5">
                          {historia.symptoms}
                        </p>
                      </li>
                      <li>
                        <h2 className="font-semibold text-white">Treatment</h2>
                        <p className="text-white text-sm w-4/5">
                          {historia.treatment}
                        </p>
                      </li>
                      <li>
                        <h2 className="font-semibold text-white">Date</h2>
                        <p className="text-white text-sm">
                          {DateTime.fromISO(historia.date).toLocaleString(
                            DateTime.DATE_MED
                          )}
                        </p>
                      </li>
                    </ul>
                    <button
                      className="bg-red-500 text-white font-semibold h-7 w-9 rounded-full hover:bg-red-600 text-center"
                      onClick={() => deleteHistoriaClinica(historia.id)}
                    >
                      <span className="text-lg">X</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {showRegisterMedic && (
            <div className=" mx-auto p-6 bg-gray-800 rounded-lg shadow-lg my-2 w-2/5">
              <h2 className="text-2xl text-white font-semibold mb-6">
                Create an account
              </h2>

              <form onSubmit={registerMedic} className="space-y-4">
                <label htmlFor="name" className="block font-medium text-white">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={formDataMedic.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="lastname"
                  className="block font-medium text-white"
                >
                  Lastname:
                </label>
                <input
                  type="text"
                  placeholder="Lastname"
                  id="lastname"
                  name="lastname"
                  required
                  value={formDataMedic.lastname}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="registrationNumber"
                  className="block font-medium text-white"
                >
                  Registration Number:
                </label>
                <input
                  type="number"
                  placeholder="Registration Number"
                  id="registrationNumber"
                  name="registrationNumber"
                  required
                  value={formDataMedic.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="specialty"
                  className="block font-medium text-white"
                >
                  Specialty:
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  value={formDataMedic.specialty}
                  required
                  onChange={handleChange}
                >
                  <option>Select Specialty</option>
                  <option value="surgeon">Surgeon</option>
                  <option value="dentist">Dentist</option>
                  <option value="pediatrician">Pediatrician</option>
                  <option value="nutritionist">Nutritionist</option>
                  <option value="psychiatrist">Psychiatrist</option>
                  <option value="psychologist">Psychologist</option>
                </select>

                <label htmlFor="email" className="block font-medium text-white">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  value={formDataMedic.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="password"
                  className="block font-medium text-white"
                >
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  value={formDataMedic.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <label
                  htmlFor="workingDays"
                  className="block font-medium text-white"
                >
                  Working Days:
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <label className="flex items-center text-white font-semibold">
                    <span>Start Time:</span>
                    <input
                      type="time"
                      name="startTime"
                      step="3600"
                      value={formDataMedic.startTime}
                      onChange={handleStartTimeChange}
                      className="ml-2 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                  <label className="flex items-center text-white font-semibold">
                    <span>End Time:</span>
                    <input
                      type="time"
                      name="endTime"
                      step="3600"
                      value={formDataMedic.endTime}
                      onChange={handleEndTimeChange}
                      className="ml-2 border border-gray-300 rounded-md p-2"
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2 text-white font-bold">
                  {Array.from(Array(7), (e, i) => {
                    const day = i + 1;
                    const dayNames = [
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ];
                    return (
                      <label key={day} className="flex items-center">
                        <input
                          type="checkbox"
                          name="workingDays"
                          value={day}
                          onChange={handleWorkingDayChange}
                          className="mr-2"
                          checked={formDataMedic.workingDays.includes(day)}
                        />
                        {dayNames[i]}
                      </label>
                    );
                  })}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
          {showRegisterAdmin && state.role === "superadmin" && (
            <div className="mx-auto p-6 bg-gray-800 rounded-lg shadow-lg my-2 w-2/5">
              <h2 className="text-2xl text-white font-semibold mb-6">
                Create an account
              </h2>

              <form onSubmit={registerAdmin} className="space-y-4">
                <label htmlFor="name" className="block font-medium text-white">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={formDataAdmin.name}
                  onChange={handleChangeAdmin}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label htmlFor="email" className="block font-medium text-white">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  value={formDataAdmin.email}
                  onChange={handleChangeAdmin}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />

                <label
                  htmlFor="password"
                  className="block font-medium text-white"
                >
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  name="password"
                  required
                  value={formDataAdmin.password}
                  onChange={handleChangeAdmin}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
                >
                  Sign Up
                </button>
              </form>
            </div>
          )}
          {showMedicalArticle && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {medicalArticle.map((article, index) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl shadow-2xl overflow-hidden my-4 md:my-0"
                >
                  <img
                    className="h-64 w-full object-cover object-center"
                    src={article.imageUrl}
                    alt="Article Image"
                  />
                  <div className="p-4">
                    <div className="text-gray-500 text-sm mb-2">
                      {new Date(article.creationDate).toLocaleDateString()}
                    </div>
                    {editArticle === article ? (
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-black font-bold"
                        >
                          Title:
                        </label>
                        <input
                          type="text"
                          id="title"
                          className="mb-2 border border-black rounded-md p-1 w-full"
                          value={editArticle.title}
                          onChange={(e) =>
                            handleEditArticle(index, "title", e.target.value)
                          }
                        />
                        <label
                          htmlFor="content"
                          className="block text-black font-bold"
                        >
                          Content:
                        </label>
                        <textarea
                          id="content"
                          className="mb-2 border border-black rounded-md p-1 w-full"
                          value={editArticle.content}
                          onChange={(e) =>
                            handleEditArticle(index, "content", e.target.value)
                          }
                        />
                        <div className="flex justify-center">
                          <button
                            className="bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 h-10 w-20 m-2"
                            onClick={() => handleSaveEditedArticle(editArticle)}
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => cancelEdit()}
                            className="bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 h-10 w-20 m-2"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="mb-2">
                        <h2 className="text-lg font-medium text-black">
                          {article.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-3">
                          {article.content}
                        </p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      {editArticle !== article && (
                        <button
                          className="bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 h-10 w-20"
                          onClick={() => setEditArticle(article)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="bg-red-500 text-white font-semibold h-10 w-10 rounded-full hover:bg-red-600 flex justify-center items-center"
                        onClick={() => deleteArticle(article.id)}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

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
