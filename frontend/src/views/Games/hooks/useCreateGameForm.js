import { useState } from "react";
import API from "../../../api/axios";

export default function useCreateGameForm(onGameCreated, onClose) {
  const [form, setForm] = useState({
    teamA: "",
    teamB: "",
    date: "",
    location: "",
    type: "FIVE_A_SIDE",
  });

  const [feedback, setFeedback] = useState({ error: "", success: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFeedback({ error: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ error: "", success: "" });

    try {
      const res = await API.post("/games", form);
      setFeedback({ success: "Jogo criado com sucesso!", error: "" });

      onGameCreated?.(res.data);
      setForm({
        teamA: "",
        teamB: "",
        date: "",
        location: "",
        type: "FIVE_A_SIDE",
      });

      setTimeout(() => {
        setFeedback({ error: "", success: "" });
        onClose?.();
      }, 1000);
    } catch (err) {
      const msg = err.response?.data?.error || "Erro ao criar jogo.";
      setFeedback({ error: msg, success: "" });
    }
  };

  return { form, feedback, handleChange, handleSubmit };
}
