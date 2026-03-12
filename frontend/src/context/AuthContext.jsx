import React, { createContext, useContext, useState, useEffect } from "react";
import { loginPatient as apiLogin, registerPatient as apiRegister } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [patient, setPatient] = useState(() => {
    try {
      const saved = localStorage.getItem("hc_patient");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (patient) {
      localStorage.setItem("hc_patient", JSON.stringify(patient));
    } else {
      localStorage.removeItem("hc_patient");
    }
  }, [patient]);

  const login = async (phone) => {
    const data = await apiLogin(phone);
    setPatient(data);
    return data;
  };

  const register = async (formData) => {
    await apiRegister(formData);
    // auto-login after register
    const data = await apiLogin(formData.phone);
    setPatient(data);
    return data;
  };

  const logout = () => {
    setPatient(null);
  };

  return (
    <AuthContext.Provider value={{ patient, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
