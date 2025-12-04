import { Navigate } from "react-router-dom";

const HomeRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Se estiver logado → dashboard
  if (token) return <Navigate to="/dashboard" replace />;

  // Se não estiver logado → renderiza a landing page
  return children;
};

export default HomeRoute;
