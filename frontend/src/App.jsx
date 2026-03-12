import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import SymptomChecker from "./pages/SymptomChecker";
import Consultation from "./pages/Consultation";
import HealthRecords from "./pages/HealthRecords";
import MedicineFinder from "./pages/MedicineFinder";

function ProtectedRoute({ children }) {
  const { patient } = useAuth();
  if (!patient) return <Navigate to="/login" replace />;
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
        <Route path="/consult" element={<Consultation />} />
        <Route path="/records" element={<HealthRecords />} />
        <Route path="/medicine" element={<MedicineFinder />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
