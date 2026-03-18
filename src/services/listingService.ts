import type { Listing } from "../types/Listing";

import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

type SearchResult = {
  count: number;
  query: string;
  listings: Listing[];
};

export const searchListings = async (query: string): Promise<SearchResult> => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${VITE_API_URL}/listings/search?${params}`);
  return handleResponse(response);
};
