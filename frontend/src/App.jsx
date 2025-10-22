import { Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Games from './pages/Games.jsx'
import GameDetails from './pages/GameDetails.jsx'


function App() {
  return (
    <>
      <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas protegidas */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games"
        element={
          <ProtectedRoute>
            <Games />
          </ProtectedRoute>
        }
      />

      <Route
        path="/games/:id"
        element={
          <ProtectedRoute>
            <GameDetails />
          </ProtectedRoute>
        }
      />


      {/* Redirecionar tudo o resto */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
    </>
  );
}

export default App;
