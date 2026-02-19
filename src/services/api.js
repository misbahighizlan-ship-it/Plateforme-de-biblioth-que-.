import axios from "axios";

/**
 * Normalizes an object by trimming keys and handling data types.
 */
export const normalizeData = (data) => {
  if (Array.isArray(data)) return data.map(normalizeData);
  if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce((acc, key) => {
      const trimmedKey = key.trim();
      let value = data[key];

      // Parse numbers if they look like numbers
      if (trimmedKey === "price" || trimmedKey === "rating" || trimmedKey === "booksCount") {
        value = Number(value) || 0;
      }

      acc[trimmedKey] = value;
      return acc;
    }, {});
  }
  return data;
};

const api = axios.create({
  baseURL: "https://6977f6b85b9c0aed1e87c204.mockapi.io/",
  timeout: 10000,
});

// Response interceptor for automatic normalization
api.interceptors.response.use(
  (response) => {
    response.data = normalizeData(response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
