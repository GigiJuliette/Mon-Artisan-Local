import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useFetch<Data>(fetchFn: () => Promise<Data>) {
  const navigate = useNavigate();
  const [data, setData] = useState<Data | undefined>();
  const [loading, setLoading] = useState(false);

  const execute = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetchFn();
      setData(result);
    } catch (err: unknown) {
      const error = err as { status?: number; message?: string };
      if (
        error.status === 401 ||
        error.status === 403 ||
        error.message === "No token found"
      ) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, navigate]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { data, loading };
}
