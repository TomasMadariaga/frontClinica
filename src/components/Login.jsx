import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ handleLogin }) => {
  const { dispatch } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      console.log(response.data)
      const token = response.data.token;
      const role = response.data.role;
      const name = response.data.name;
      const id = parseInt(response.data.id)
      dispatch({ type: "LOGIN", payload: { token, role } });
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("name", name);
      localStorage.setItem("id", id)
      handleLogin(response.data);

      console.log("Inicio de sesión exitoso:");

      navigate("/");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      toast.error(`Email o contraseña incorrectas`)
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-teal-500 rounded-lg my-2">
      <h2 className="text-2xl font-semibold mb-4 text-slate-100">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <ul className="flex w-full justify-between">
          <li>
            <label className="text-slate-100 font-bold">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleShowPassword}
                id="checkbox"
              />
              Show Password
            </label>
          </li>
          <li>
            <Link
              to="/auth/register/patient"
              className="underline text-blue-700"
            >
              Don't have an account?
            </Link>
          </li>
        </ul>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    <ToastContainer/>
    </div>
  );
};

export default Login;
