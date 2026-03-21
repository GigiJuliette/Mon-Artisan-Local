import type { Speciality } from "@/types/Specialitiy";
import { handleResponse } from "./utils/handleResponse";
import authFetch from "./utils/authFetch";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export interface SpecialitiesResponse {
  count: number;
  specialities: Speciality[];
}

export interface CreateSpecialityPayload {
  name: string;
}

export interface CreateSpecialityResponse {
  message: string;
  speciality: Speciality;
}

export const specialityService = {
  getAll: async (): Promise<SpecialitiesResponse> => {
    const response = await fetch(`${VITE_API_URL}/specialities`);
    return handleResponse(response);
  },
  create: async (
    payload: CreateSpecialityPayload,
  ): Promise<CreateSpecialityResponse> => {
    const response = await authFetch(`${VITE_API_URL}/specialities`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
