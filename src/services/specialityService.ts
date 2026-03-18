import type { Speciality } from "@/types/Specialitiy";
import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export interface SpecialitiesResponse {
  count: number;
  specialities: Speciality[];
}

export const specialityService = {
  getAll: async (): Promise<SpecialitiesResponse> => {
    const response = await fetch(`${VITE_API_URL}/specialities`);
    return handleResponse(response);
  },
};
