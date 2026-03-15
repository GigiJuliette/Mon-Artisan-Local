import { useEffect, useState } from "react";

import { searchListings } from "@/services/listingService";
import type { Listing } from "@/types/Listing";

export const useSearchListings = (query: string) => {
  const [results, setResults] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchListings(query);
        setResults(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erreur inattendue");
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return { results, loading, error };
};
