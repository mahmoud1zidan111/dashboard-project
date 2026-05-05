import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const normalizedError = {
      message: "Unexpected error",
      status: null,
      data: null,
    };

    if (!error.response) {
      normalizedError.message = "Network error: cannot reach API";
      return Promise.reject(normalizedError);
    }
    normalizedError.status = error.response.status;
    normalizedError.data = error.response.data;
    normalizedError.message =
      error.response.data?.message ||
      `Request failed with status ${error.response.status}`;

    return Promise.reject(normalizedError);
  },
);

export default axiosClient;
