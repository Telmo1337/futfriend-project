import { Navigate } from "react-router-dom";

const HomeRoute = () => {
  const token = localStorage.getItem("token");

  // se o utilizador estiver logado redireciona para o dashboard
  // caso contrário vai para login
  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default HomeRoute;
