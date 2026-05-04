import { createContext, useContext, useMemo, useState } from "react";
import { login as apiLogin } from "../services/resources/auth.service";
import { setAuthUser, getAuthUser, clearAuthUser } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getAuthUser());

  const isAuthenticated = !!user;

  const login = async (email, password) => {
    const loggedUser = await apiLogin(email, password);
    setAuthUser(loggedUser);
    setUser(loggedUser);
    return loggedUser;
  };

  const logout = () => {
    clearAuthUser();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
