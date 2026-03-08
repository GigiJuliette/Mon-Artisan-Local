import type { User } from "../types/User";

import { handleResponse } from "./utils/handleResponse";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  register: async (payload: Partial<User>) => {
    const response = await fetch(`${VITE_API_URL}api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  login: async (payload: Partial<User>) => {
    const response = await fetch(`${VITE_API_URL}api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },
};
