import { useState } from "react";
import API from "@/api/axios";

export default function useCreateGame(onSuccess) {
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    date: "",
    location: "",
    type: "FIVE_A_SIDE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      setError(null);
    };
  }

  async function submit() {
    if (!form.teamA || !form.teamB || !form.date || !form.location) {
      setError("Preenche todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        date: new Date(form.date).toISOString(),
      };

      await API.post("/games", payload);
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao criar jogo.");
    } finally {
      setLoading(false);
    }
  }


  return {
    form,
    loading,
    error,
    handleChange,
    submit,
  };
}
