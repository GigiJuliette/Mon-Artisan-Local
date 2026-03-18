import type { ListingData } from "../types/Listing";
import type { Coordinates } from "../hooks/useGeolocation";

import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

interface SearchResponse {
  query?: string;
  listings: ListingData[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  sortedBy?: string;
}

export const searchListings = async (
  query: string,
  coordinates?: Coordinates
): Promise<ListingData[]> => {
  const params = new URLSearchParams({ q: query });

  if (coordinates) {
    params.append('latitude', coordinates.latitude.toString());
    params.append('longitude', coordinates.longitude.toString());
  }

  const response = await fetch(`${VITE_API_URL}/listings/search?${params}`);
  const data: SearchResponse = await handleResponse(response);

  // Extract the listings array and wrap each in the expected format
  return data.listings;
};
