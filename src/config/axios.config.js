import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.github.com/search/repositories",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/vnd.github.v3+json",
    // Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`, // Uncomment and use a token to increase rate limits
  },
});

export const searchRepositories = async (packageName) => {
  try {
    const encodedPackageName = encodeURIComponent(packageName);
    const packageResponse = await axios.get(
      `https://registry.npmjs.org/${encodedPackageName}`
    );

    const repoUrl = packageResponse.data.repository?.url;
    if (!repoUrl) {
      throw new Error("Repository URL not found in the npm package.");
    }

    const repoName = repoUrl.replace("git+", "").replace(".git", "");
    const ownerAndRepo = repoName.split("github.com/")[1];
    if (!ownerAndRepo) {
      throw new Error("Owner and repo name could not be extracted.");
    }

    const response = await axiosInstance.get("", {
      params: { q: ownerAndRepo },
    });

    return response;
  } catch (error) {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.message?.includes("API rate limit exceeded")
    ) {
      const resetTime = error.response.headers["x-ratelimit-reset"];
      const retryAfter = resetTime
        ? Math.max(resetTime * 1000 - Date.now(), 0)
        : 0;
      const waitMinutes = Math.ceil(retryAfter / 60000);

      return new Error(
        `Free Trail API limit exceeded. Please try again after ${waitMinutes} minute(s) or Refer README.`
      );
    } else {
      console.error(
        "Error fetching repositories:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }
};
