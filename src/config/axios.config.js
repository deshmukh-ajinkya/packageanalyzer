import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com/search/repositories",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Access the VITE_ prefixed variable
  },
});

export const searchRepositories = async (query) => {
  try {
    const response = await axiosInstance.get("", {
      params: {
        q: query,
      },
    });
    return response; // Return the data directly
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error; // Optionally re-throw the error for handling in the calling code
  }
};
