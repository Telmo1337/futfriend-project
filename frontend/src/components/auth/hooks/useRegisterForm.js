import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import API from "../../../api/axios";

export default function useRegisterForm() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isDisabled =
    !form.firstName || !form.lastName || !form.email || !form.password;

  const handleChange = (field) => (e) => {
    setError("");
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      setSuccess("Conta criada! A iniciar sessão...");
      setError("");

      await login({ email: form.email, password: form.password });
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Erro ao criar conta.");
      setSuccess("");
    }
  };

  return { form, handleChange, handleSubmit, error, success, isDisabled };
}
