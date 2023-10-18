import { Link } from "react-router-dom";
import logo from "../assets/icon3.webp";

export const Navbar = ({ isLoggedIn, user, handleLogout }) => {
  const storedRole = localStorage.getItem("role");
  const storedToken = localStorage.getItem("token");

  const isAdmin =
    (user && user.role === "admin") ||
    (user && user.role === "superadmin") ||
    storedRole === "admin" ||
    storedRole === "superadmin";

  return (
    <nav className="flex px-5 m-0 w-full h-14 max-h-14 bg-teal-600 shadow-md">
      <Link to="/" className="self-center">
        <img src={logo} alt="Logo clínica" className="h-9 w-9" />
      </Link>
      <ul className="w-11/12 flex list-none justify-end m-0 p-0 items-center">
        <li className="py-2.5 font-sans font-medium text-slate-100 text-xl px-2">
          {user && user.name
            ? user.name
            : localStorage.getItem("name")
            ? localStorage.getItem("name")
            : false}
        </li>
        {isAdmin && (
          <li className="py-2.5">
            <Link
              to="/admin"
              className="font-sans font-medium text-red-600 text-xl px-3 hover:text-red-700"
            >
              Admin
            </Link>
          </li>
        )}
        <li className="py-2.5">
          {storedToken ? (
            <button
              onClick={handleLogout}
              className="font-sans font-medium text-slate-100 text-xl px-3 hover:text-indigo-500"
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/auth/login"
              className="font-sans font-medium text-slate-100 text-xl px-3 hover:text-indigo-500"
            >
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};
