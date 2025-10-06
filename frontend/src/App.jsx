import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <>
      <nav className="">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500" : "text-black"}>Início</NavLink> | 
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-red-500" : "text-black"}>Sobre</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>


      <div>
        <h1 className="bg-amber-600">FutFriend</h1>
      </div>
    </>
  );
}

export default App;
