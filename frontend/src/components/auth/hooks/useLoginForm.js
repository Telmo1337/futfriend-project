import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

export default function useLoginForm() {


  const navigate = useNavigate();

  const { login } = useAuth();


  const [form, setForm] = useState({ identifier: "", password: "" });

  const [error, setError] = useState("");

  const handleChange = (field) => (e) => {

    setError("");

    setForm({ ...form, [field]: e.target.value });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();
    try {


      await login(form);
      navigate("/dashboard");


    } catch (err) {
      
      console.error(err);
      
      
      const msg = err.response?.data?.error || "Erro ao iniciar sessão. Tente novamente mais tarde.";
      setError(msg);
    }
  };

  return { form, error, handleChange, handleSubmit };
}
