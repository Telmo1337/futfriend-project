import { Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";

// Routes (guards)
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import HomeRoute from "@/routes/HomeRoute";

// Auth Components
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Pages
import NoFound from "@/pages/NoFound";


import Dashboard from "@/views/Dashboard/Dashboard";
import Games from "@/views/Games/Games";
import Profile from "@/views/Profile/Profile";
import Stats from "@/views/Stats/Stats";
import Help from "@/views/Help/Help";
import Settings from "@/views/Settings/Settings";

//landing page
import HomePage from "@/pages/LandingPage/HomePage"



const AppRoutes = () => {
  return (
    <Routes>

      {/*rota raiz*/}
      <Route path="/" element={<HomeRoute><HomePage /></HomeRoute>} />

      {/* Rotas públicas */}
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      {/* Rota protegida: Dashboard (apenas uma) */}
      {/* Protected Area (Toolpad) */}
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <DashboardLayout />
          </ProtectedRoutes>
        }
      >
        <Route path="painel" element={<Dashboard />} />
        <Route path="jogos" element={<Games />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="estatisticas" element={<Stats />} />
        <Route path="ajuda" element={<Help />} />
        <Route path="definicoes" element={<Settings />} />
      </Route>


      {/* 404 */}
      <Route path="*" element={<NoFound />} />
    </Routes>
  );
};

export default AppRoutes;
