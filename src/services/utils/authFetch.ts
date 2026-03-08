const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
};
export default authFetch;
