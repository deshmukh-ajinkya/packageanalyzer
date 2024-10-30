# Package Analyzer

**Package Analyzer** is a web application designed to help developers evaluate the reliability of their project dependencies. It provides insights based on key metrics like stars and forks by fetching real-time data from the GitHub API.

## Key Features

- **Dependency Evaluation**: Analyze a repository's reliability by checking stars, forks, and open issues.
- **User-Friendly Interface**: Easily search for repositories and view detailed statistics.
- **Reliability Rating**: Get a score based on stars, forks, and dependency health to assess repository worth.
- **Comparison Tool**: Compare multiple repositories side by side to aid in decision-making.
- **Responsive Design**: Works seamlessly across all devices.

## How It Works

1. **Input Repository Name**: Enter the name of the dependency or import a `package.json` file.
2. **Fetch Data**: The app retrieves real-time data about the repository's metrics.
3. **View Reports**: Get a comprehensive overview of the repository's reliability, including a breakdown of its dependencies.

### Reliability Metrics

- **Stars**: Indicates popularity and community approval.
- **Forks**: Shows engagement from other developers.
- **Dependency Analysis**: Identifies outdated dependencies and known vulnerabilities.

## Usage Instructions

### To Search for a Single Dependency Report

1. Type the name of the dependency in the search box.
2. Click the search icon.
3. View the report in the table.

### To Check All Dependency Reports from a `package.json` File

1. Click the "Import package.json" button.
2. View the report in the table.

![How To Use](https://github.com/deshmukh-ajinkya/packageanalyzer/raw/main/src/assets/how-to.gif)

## Support and Limitations

- Reports can only be generated for **public repositories**.
- Grouped or private packages are ignored.
- The GitHub free tier allows **60 requests per hour**. For a higher limit of **5000 requests per hour**, follow these steps to generate a token:

### Steps to Generate a GitHub Token

1. **Log In**: Go to GitHub and log in to your account.
2. **Settings**: Click on your profile picture and select **Settings**.
3. **Developer Settings**: Scroll down and click **Developer settings**.
4. **Personal Access Tokens**: Select **Personal access tokens** and click on **Tokens (classic)**.
5. **Generate Token**:
   - Click **Generate new token**.
   - Fill in the note (description) and set an expiration.
   - Select the desired scopes (permissions) for the token.
   - Click **Generate token** at the bottom.
6. **Copy the Token**: Copy the generated token immediately; you won’t see it again.
7. **Add to .env File**: Paste the token into your `.env` file with the key `VITE_GITHUB_TOKEN`.
8. **Uncomment Code**: Uncomment the relevant code in `src/config/axios.config.js`.

## Note

- This application is built on top of GitHub's Open API, so the request limit may be reached quickly.
- If you encounter issues, refer to the steps above to generate a token.
