import { useEffect, useState, useCallback } from "react";
import API from "@/api/axios";
import useAuth from "@/components/auth/hooks/useAuth";

export default function useProfile() {
  const { user, updateUser, logout } = useAuth();

  const [data, setData] = useState(null);
  const [form, setForm] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!user) return;

    API.get(`/users/${user.id}`).then(res => {
      setData(res.data);
      setForm(res.data);
    });
  }, [user]);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function save() {
    const res = await API.put(`/users/${user.id}`, {
      firstName: form.firstName,
      lastName: form.lastName,
      nickname: form.nickname,
      email: form.email,
    });

    setData(res.data);
    updateUser(res.data);
    setEditing(false);
  }

  const deleteAccount = useCallback(async () => {
    await API.delete(`/users/${user.id}`);
    logout();
    window.location.href = "/login";
  }, [user, logout]);

  return {
    user,
    data,
    form,
    editing,
    setEditing,
    handleChange,
    save,
    deleteAccount, 
  };
}
