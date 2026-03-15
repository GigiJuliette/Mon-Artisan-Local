import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export function useFetch<Data>(fetchFn: () => Promise<Data>) {
  const navigate = useNavigate();
  const [data, setData] = useState<Data | undefined>();
  const [loading, setLoading] = useState(false);

  const execute = async () => {
    try {
      setLoading(true);
      const result = await fetchFn();
      setData(result);
    } catch (err: any) {
      if (
        err.status === 401 ||
        err.status === 403 ||
        err.message === "No token found"
      ) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  return { data, loading };
}
