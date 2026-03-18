import type { Listing, ListingData } from "../types/Listing";
import type { Coordinates } from "../hooks/useGeolocation";

import { handleResponse } from "./utils/handleResponse";
import authFetch from "./utils/authFetch";

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
interface listingResponse {
  count: number;
  listing: ListingData[];
}
export const searchListings = async (
  query: string,
  coordinates?: Coordinates,
): Promise<Listing[]> => {
  const params = new URLSearchParams({ q: query });

  if (coordinates) {
    params.append("latitude", coordinates.latitude.toString());
    params.append("longitude", coordinates.longitude.toString());
  }

  const response = await fetch(`${VITE_API_URL}/listings/search?${params}`);
  const data: SearchResponse = await handleResponse(response);

  // Extract the listings array and wrap each in the expected format
  return data.listings.map((listing) => ({ listing }));
};

export const createListing = async (
  payload: ListingData,
): Promise<listingResponse> => {
  const response = await authFetch(`${VITE_API_URL}/listings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const getAllListingsForAdmin = async (): Promise<listingResponse> => {
  const response = await authFetch(`${VITE_API_URL}/listings/admin/all`, {
    method: "GET",
  });

  return handleResponse(response);
};
