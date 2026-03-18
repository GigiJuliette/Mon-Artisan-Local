import { useState } from "react";

export function useServiceHandler<T, R>(fetchFn: (payload: T) => Promise<R>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const submit = async (
    payload: T,
    fallbackError = "Une erreur est survenue",
  ) => {
    try {
      setLoading(true);
      setError("");
      const result = await fetchFn(payload);
      return result;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || fallbackError);
      } else {
        setError(fallbackError);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { submit, loading, error };
}
