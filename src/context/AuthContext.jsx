// AuthContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialState = {
    isAuthenticated: false,
    token: null,
    role: null, // Agrega una propiedad para el rol
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          isAuthenticated: true,
          token: action.payload.token,
          role: action.payload.role, // Establece el rol al iniciar sesión
        };
      case "LOGOUT":
        return {
          isAuthenticated: false,
          token: null,
          role: null, // Borra el rol al cerrar sesión
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Al cargar la página, verifica si existe un token en el almacenamiento local
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (storedToken) {
      dispatch({
        type: "LOGIN",
        payload: { token: storedToken, role: storedRole },
      });
    }
    console.log(`Token: ${storedToken} Role: ${storedRole}`)
  }, []);
  
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
