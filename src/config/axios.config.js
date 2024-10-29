import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com/search/repositories",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
    // Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Uncomment this line to add Token In Env To Increase Limit
  },
});

export const searchRepositories = async (packageName) => {
  // Accept packageName as a parameter
  try {
    const encodedPackageName = encodeURIComponent(packageName);
    const packageResponse = await axios.get(
      `https://registry.npmjs.org/${encodedPackageName}`
    );

    // Check if the repository URL exists
    const repoUrl = packageResponse.data.repository?.url;
    if (!repoUrl) {
      throw new Error("Repository URL not found in the npm package.");
    }

    // Extract the owner and repo name from the URL
    const repoName = repoUrl
      .replace("git+", "") // Remove 'git+'
      .replace(".git", ""); // Remove '.git'

    const ownerAndRepo = repoName.split("github.com/")[1];
    if (!ownerAndRepo) {
      throw new Error("Owner and repo name could not be extracted.");
    }

    // Fetch repositories from GitHub using the owner and repo name
    const response = await axiosInstance.get("", {
      params: {
        q: ownerAndRepo, // Use the owner and repo name
      },
    });

    return response; // Return the response data
  } catch (error) {
    if (
      error.response &&
      error.response.data.message === "Rate limit exceeded"
    ) {
      return new Error("Rate limit exceeded. Please try again later.");
    } else {
      console.error(
        "Error fetching repositories:",
        error.response ? error.response.data : error.message
      );
      throw error; // Rethrow other errors
    }
  }
};
