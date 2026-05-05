import axiosClient from "../api/axiosClient";

export async function getStats() {
  const response = await axiosClient.get("/stats");
  return response.data;
}

export async function getTransactions() {
  const response = await axiosClient.get("/transactions");
  return response.data;
}

export async function getSchedule() {
  const response = await axiosClient.get("/schedule");
  return response.data;
}

export async function getTopProducts() {
  const response = await axiosClient.get("/products", {
    params: { _limit: 5 },
  });

  if (Array.isArray(response.data) && response.data.length > 0) {
    return response.data;
  }

  const fallbackResponse = await axiosClient.get("/products");
  return Array.isArray(fallbackResponse.data)
    ? fallbackResponse.data.slice(0, 5)
    : fallbackResponse.data;
}
