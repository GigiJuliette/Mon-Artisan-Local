import { useEffect, useState } from "react";

import { searchListings } from "@/services/listingService";
import type { ListingData } from "@/types/Listing";
import type { Coordinates } from "@/hooks/useGeolocation";

export const useSearchListings = (query: string, coordinates?: Coordinates | null) => {
  const [results, setResults] = useState<ListingData[]>([]);
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
        const data = await searchListings(query, coordinates || undefined);
        setResults(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Erreur inattendue");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, coordinates]);

  return { results, loading, error };
};
