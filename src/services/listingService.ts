import type { Listing } from "../types/Listing";

import { handleResponse } from "./utils/handleResponse";
import authFetch from "./utils/authFetch";

const VITE_API_URL = import.meta.env.VITE_API_URL;

type SearchResult = {
  count: number;
  query: string;
  listings: Listing[];
};

export interface CreateListingPayload {
  title: string;
  description: string;
  address: string;
  city: string;
  latitude: string;
  longitude: string;
  specialityIds: number[];
}

export interface CreateListingResponse {
  message: string;
  listing: {
    id: number;
    title: string;
    description: string;
    status: string;
    userId: number;
    address: string;
    city: string;
    latitude: string;
    longitude: string;
    createdAt: string;
    updatedAt: string;
    specialities: Array<{
      id: number;
      name: string;
    }>;
  };
}

export interface AdminAllListingsResponse {
  count: number;
  listings: Listing[];
}

export const searchListings = async (query: string): Promise<SearchResult> => {
  const params = new URLSearchParams({ q: query });
  const response = await fetch(`${VITE_API_URL}/listings/search?${params}`);
  return handleResponse(response);
};

export const createListing = async (
  payload: CreateListingPayload,
): Promise<CreateListingResponse> => {
  const response = await authFetch(`${VITE_API_URL}/listings`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const getAllListingsForAdmin =
  async (): Promise<AdminAllListingsResponse> => {
    const response = await authFetch(`${VITE_API_URL}/listings/admin/all`, {
      method: "GET",
    });

    return handleResponse(response);
  };
