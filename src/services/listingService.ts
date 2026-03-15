import type { Listing } from "../types/Listing";

import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const searchListings = async (query: string): Promise<Listing[]> => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${VITE_API_URL}api/listings/search?${params}`);
  return handleResponse(response);
};
