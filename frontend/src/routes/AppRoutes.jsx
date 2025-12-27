import { Routes, Route } from "react-router-dom";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";

// Guards
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import HomeRoute from "@/routes/HomeRoute";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";

// Pages
import NoFound from "@/pages/NoFound";

// Views
import Dashboard from "@/views/Dashboard/Dashboard";
import Games from "@/views/Games/Games";
import GameLobby from "@/views/Games/GameLobby";
import Profile from "@/views/Profile/Profile";
import Stats from "@/views/Stats/Stats";
import Help from "@/views/Help/Help";
import Settings from "@/views/Settings/Settings";

// Landing
import HomePage from "@/pages/LandingPage/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing */}
      <Route
        path="/"
        element={
          <HomeRoute>
            <HomePage />
          </HomeRoute>
        }
      />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
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
        <Route path="jogos/:id" element={<GameLobby />} />
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
