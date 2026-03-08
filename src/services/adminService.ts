import type { Listing } from "../types/Listing";

import authFetch from "./utils/authFetch";
import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getPendingListings = async (): Promise<Listing[]> => {
  const response = await authFetch(`${VITE_API_URL}/admin/listings/pending`);
  return handleResponse(response);
};

export const approveListing = async (listingId: string): Promise<void> => {
  const response = await authFetch(
    `${VITE_API_URL}/admin/listings/${listingId}/approve`,
    {
      method: "POST",
    },
  );
  return handleResponse(response);
};

export const rejectListing = async (listingId: string): Promise<void> => {
  const response = await authFetch(
    `${VITE_API_URL}/admin/listings/${listingId}/reject`,
    {
      method: "POST",
    },
  );
  return handleResponse(response);
};
