export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const error: any = new Error(errorData.message);
    error.status = response.status;
    throw error;
  }
  return response.json();
};
