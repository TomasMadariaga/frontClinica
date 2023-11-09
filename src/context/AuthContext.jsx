// AuthContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialState = {
    isAuthenticated: false,
    token: null,
    role: null,
  };

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return {
          isAuthenticated: true,
          token: action.payload.token,
          role: action.payload.role,
        };
      case "LOGOUT":
        return {
          isAuthenticated: false,
          token: null,
          role: null,
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
