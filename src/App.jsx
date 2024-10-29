import { useState, useRef } from "react";
import Logo from "./assets/logo.png";
import Approve from "./assets/approve.png";
import Reject from "./assets/reject.png";
import Search from "./assets/search.png";
import Upload from "./assets/upload.png";
import { searchRepositories } from "./config/axios.config";
import "./App.css";

function App() {
  const [projectName, setProjectName] = useState("");
  const [depName, setDepName] = useState("");
  const [tableData, setTableData] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const json = JSON.parse(e.target.result);
        setProjectName(json.name || "Unknown Project");

        // Combine dependencies and devDependencies
        const dependencies = [
          ...Object.keys(json.dependencies || {}),
          ...Object.keys(json.devDependencies || {}),
        ];

        setTableData([]);

        const fetchedData = await Promise.all(
          dependencies.map(async (dep) => {
            try {
              const response = await searchRepositories(dep);
              if (response && response.data.items.length > 0) {
                return response.data.items[0];
              }
            } catch (error) {
              console.error(`Error fetching data for ${dep}:`, error);
            }
            return null;
          })
        );
        setTableData(fetchedData.filter(Boolean));
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid package.json file.");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSearch = async () => {
    if (depName.trim() !== "") {
      try {
        const response = await searchRepositories(depName);
        if (response && response.data.items.length > 0) {
          setTableData([response.data.items[0]]);
        } else {
          setTableData([]);
        }
      } catch (error) {
        console.error("Error fetching data for the search:", error);
      }
    }
  };

  return (
    <>
      <div className="header">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="search-upload-container">
        <p className="project-name">
          Project Name: <span>{projectName}</span>
        </p>
        <input
          type="text"
          className="input-dependency"
          placeholder="Enter Dependency Name"
          value={depName}
          onChange={(e) => setDepName(e.target.value)}
        />
        <img
          src={Search}
          alt="search-icon"
          className="search-icon"
          onClick={handleSearch}
        />
        <button onClick={handleUploadClick} className="upload-button">
          <img src={Upload} alt="upload-icon" />
          Import package.json
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="application/json"
          onChange={handleFileUpload}
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Dependency</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Homepage</th>
              <th>Descriptor</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((repo, index) => (
                <tr key={index}>
                  <td>{repo.name}</td>
                  <td>{repo.stargazers_count}</td>
                  <td>{repo.forks_count}</td>
                  <td>
                    {repo.homepage ? (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        official website
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="descriptor">
                    {repo.stargazers_count > 1000 ? (
                      <>
                        <img src={Approve} alt="approve" width="12px" />
                        <p>Reliable</p>
                      </>
                    ) : (
                      <>
                        <img src={Reject} alt="reject" width="16px" />
                        <p>Unreliable</p>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
