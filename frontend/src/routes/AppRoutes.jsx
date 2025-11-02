import { Routes, Route } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoutes from "../routes/ProtectedRoutes";
import HomeRoute from "../routes/HomeRoute";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

import NoFound from "../pages/NoFound";

const AppRoutes = () => {
  return (
    <Routes>

      {/*rota raiz*/}
      <Route path="/" element={<HomeRoute />} />

      {/* Rotas públicas */}
      <Route path="/login" element={<AuthLayout><LoginForm /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterForm /></AuthLayout>} /> 

      {/* Rota protegida: Dashboard (apenas uma) */}
      <Route
        path="/dashboard"
        element={<ProtectedRoutes><DashboardLayout /></ProtectedRoutes>}
      />

      {/* 404 */}
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
};

export default AppRoutes;
