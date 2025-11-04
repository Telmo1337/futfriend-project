import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import API from "../../../api/axios";
import debounce from "lodash.debounce";

// Hook reutilizável para pesquisa de utilizadores no backend
export default function usePlayerSearch() {
  const [options, setOptions] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const activeRequest = useRef(false);

  const fetchUsers = useCallback(async (query) => {
    if (!query.trim()) {
      setOptions([]);
      return;
    }

    if (activeRequest.current) return;
    activeRequest.current = true;
    setLoadingSearch(true);

    try {
      const res = await API.get(`/users/search?q=${query}`);
      setOptions(res.data || []);
    } catch (err) {
      console.error("Erro ao buscar utilizadores:", err);
    } finally {
      activeRequest.current = false;
      setTimeout(() => setLoadingSearch(false), 200);
    }
  }, []);

  const debouncedFetch = useMemo(() => debounce(fetchUsers, 400), [fetchUsers]);

  useEffect(() => {
    return () => debouncedFetch.cancel();
  }, [debouncedFetch]);

  return {
    options,
    loadingSearch,
    handleSearch: debouncedFetch,
  };
}
