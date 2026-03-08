import { useState } from "react";
import { useNavigate } from "react-router";

export function useRegisterFetch<T, R>(fetchFn: (payload: T) => Promise<R>) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const register = async (payload: T) => {
    try {
      setLoading(true);
      setError("");
      await fetchFn(payload);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
