import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { User } from "@/types/User";

interface AuthResponse {
  token: string;
  user: User;
}

export function useAuthHandler<T>(
  fetchFn: (payload: T) => Promise<AuthResponse>,
) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const submit = async (payload: T) => {
    try {
      setLoading(true);
      setError("");
      const result = await fetchFn(payload);
      setAuth({ token: result.token, user: result.user });
      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Une erreur est survenue");
      } else {
        setError("Une erreur est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
