# Pacakage Analyzer

* Web page designed to help developer evaluate the reliability of dependency by analyzing key metrics such as stars, forks. The application fetches data from the GitHub API, allowing users to input a repository name or directly import package.json file and receive a comprehensive overview of its reliability.

* Utilizes the GitHub API to fetch real-time data on repositories, including the number of stars, forks, open issues, and recent activity.

### Reliability Metrics:
### Stars
* Displays the total number of stars a repository has received, indicating popularity and community approval.

### Forks
* Shows the number of forks, suggesting how many developers have engaged with the repository and created their own versions.

### Dependency Analysis
* Evaluates the dependencies listed in the repository, providing insights into their reliability and frequency of updates. This feature can highlight outdated dependencies or those with known vulnerabilities.

### User Interface
* An intuitive and user-friendly interface that allows users to search for repositories easily and view detailed statistics and analysis results.

### Reliability Rating
* Generates a reliability score based on stars, forks, and dependency health, helping users quickly assess whether a repository is worth using in their projects.

### Comparison Tool
* Allows users to compare multiple repositories side by side based on their reliability metrics, aiding in decision-making for project dependencies.

### Responsive Design
* Fully responsive web application that works seamlessly across devices, ensuring accessibility for all users.


## Support
* Generate report for public repositories only
* Grouped or private pacakges ignored


# Note:
Github free tier support only 60 request/hour so if you want increase limit to 5000 request/hour you can generate token and add it in env as follows:

## Step To Generate Token 

* Log In: Go to GitHub and log in to your account.

* Settings: Click on your profile picture in the top-right corner and select Settings.

* Developer Settings: Scroll down in the left sidebar and click on Developer settings.

* Personal Access Tokens: Select Personal access tokens and then click Tokens (classic).

* Generate Token:

* Click Generate new token.
  * Fill in the Note (description) and set an expiration.
  * Select the desired scopes (permissions) for the token.
  * Create Token: Click Generate token at the bottom.

* Copy the Token: Copy the generated token immediately; you won’t see it again.

* Paste in .env file with key VITE_GITHUB_TOKEN

* Uncomment code on Path: src\config\axios.config.js


# How To Use

![How To Use](https://github.com/deshmukh-ajinkya/packageanalyzer/raw/main/src/assets/how-to.gif)
