import { useState } from "react";
import { useNavigate } from "react-router";

export function useLoginFetch<T, R>(
  fetchFn: (payload: T) => Promise<R & { token: string }>,
) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const login = async (payload: T) => {
    try {
      setLoading(true);
      setError("");
      const result = await fetchFn(payload);
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
