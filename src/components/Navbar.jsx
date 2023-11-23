import { Link } from "react-router-dom";
import logo from "../assets/icon3.webp";

export const Navbar = ({ user, handleLogout }) => {
  const storedRole = localStorage.getItem("role");
  const storedToken = localStorage.getItem("token");
  const storedId = localStorage.getItem("id");

  const isAdmin =
    (user && user.role === "admin") ||
    (user && user.role === "superadmin") ||
    storedRole === "admin" ||
    storedRole === "superadmin";

  const isMedic = (user && user.role === "medic") || storedRole === "medic";

  const isPatient =
    (user && user.role === "patient") || storedRole === "patient";

  return (
    <nav className="flex px-5 m-0 w-screen h-14 max-h-14 bg-teal-600 shadow-md">
      <Link to="/" className="self-center">
        <img src={logo} alt="Logo clínica" className="h-9 w-9" />
      </Link>
      <ul className="w-11/12 flex list-none justify-end m-0 p-0 items-center">
        {isAdmin && (
          <li className="py-2.5 pr-4">
            <Link
              to="/admin"
              className="bg-red-600 font-sans rounded-xl font-medium text-white text-xl px-3 py-1 hover:bg-red-500"
            >
              Admin
            </Link>
          </li>
        )}
        {isMedic && (
          <li className="py-2.5 pr-4">
            <Link
              to="/medic"
              className="bg-sky-700 font-sans rounded-xl font-medium text-white text-xl px-3 py-1 hover:bg-sky-800"
            >
              Medic
            </Link>
          </li>
        )}
        {isPatient && (
          <li className="py-2.5 pr-4">
            <span className="border-r border-slate-500 pr-4">
              <Link
                to="/patient"
                className="bg-sky-700 font-sans rounded-xl font-medium text-white text-xl px-3 py-1 hover:bg-sky-800"
              >
                Take shift
              </Link>
            </span>
          </li>
        )}
        <li className="py-2.5 px-4">
          {storedToken ? (
            <button
              onClick={handleLogout}
              className="font-sans font-medium text-slate-100 text-xl hover:text-slate-300"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="font-sans font-medium text-slate-100 text-xl hover:text-indigo-500"
            >
              Sign In
            </Link>
          )}
        </li>
        <Link
          className="py-2.5 font-sans font-medium text-slate-100 px-4 text-xl hover:text-slate-300"
          to={`/profile/${storedId}`}
        >
          {user && user.name
            ? user.name
            : localStorage.getItem("name")
            ? localStorage.getItem("name")
            : false}
        </Link>
      </ul>
    </nav>
  );
};
