import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Login from "./Login";

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const { state } = useAuth();

  useEffect(() => {
    if (state.isAuthenticated) {
      // Agregar el token a las solicitudes Axios
      axios.defaults.headers.common["Authorization"] = `${state.token}`;
    } else {
      // Si no está autenticado, eliminar el token de las solicitudes Axios
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [state]);

  const showUsers = () => {
    useEffect(() => {
      // Realiza una solicitud al servidor para obtener los datos de usuarios
      axios
        .get("http://localhost:3000/auth/users") // Reemplaza '/api/users' con la ruta correcta en tu servidor
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("Error al obtener usuarios:", error);
        });
    }, []);
    return console.log(users);
  };

  if (
    (state.isAuthenticated && state.role === "admin") ||
    (state.isAuthenticated && state.role === "superadmin")
  ) {
    // Usuario autenticado y con rol de administrador, muestra el contenido de administración
    return (
      <div className="flex h-full">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 text-white p-4">
          <ul className="space-y-2">
            <li className="group">
              <Link href={showUsers} className="flex items-center">
                <span className="text-lg">Usuarios</span>
              </Link>
            </li>
            <li className="group">
              <Link href="/admin/appointments" className="flex items-center">
                <span className="text-lg">Turnos</span>
              </Link>
            </li>
            <li className="group">
              <Link href="/admin/plans" className="flex items-center">
                <span className="text-lg">Planes</span>
              </Link>
            </li>
            <li className="group">
              <Link href="/admin/medical-records" className="flex items-center">
                <span className="text-lg">Historias Clínicas</span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Contenido principal */}
        <div className="p-4">
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
