import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import PatientManagement from "./components/patients/PatientManagement";
import TreatmentPlans from "./components/treatments/TreatmentPlans";
import MedicalHistory from "./components/history/MedicalHistory";
import SpecializedCare from "./components/specialized/SpecializedCare";
import Appointments from "./components/appointments/Appointments";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./i18n";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">جاري التحميل...</div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function AppContent() {
  const { i18n } = useTranslation();

  return (
    <div
      className={`min-h-screen bg-gray-50 ${i18n.language === "ar" ? "font-arabic" : "font-sans"}`}
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/patients" element={<PrivateRoute><PatientManagement /></PrivateRoute>} />
          <Route path="/treatments" element={<PrivateRoute><TreatmentPlans /></PrivateRoute>} />
          <Route path="/history" element={<PrivateRoute><MedicalHistory /></PrivateRoute>} />
          <Route path="/specialized" element={<PrivateRoute><SpecializedCare /></PrivateRoute>} />
          <Route path="/appointments" element={<PrivateRoute><Appointments /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;