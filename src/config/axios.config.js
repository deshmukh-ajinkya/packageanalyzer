import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com/search/repositories",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
    // Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Add Token In Env To Increase Limit
  },
});

export const searchRepositories = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    console.log(`Fetching repositories for query: ${encodedQuery}`); // Log query
    const response = await axiosInstance.get("", {
      params: {
        q: encodedQuery, // Use the encoded query here
      },
    });
    return response; // Return the response data
  } catch (error) {
    console.error(
      "Error fetching repositories:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
