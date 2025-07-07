import { useState } from "react";
import Logo from "../assets/logo.png";
import Approve from "../assets/approve.png";
import Reject from "../assets/reject.png";
import Search from "../assets/search.png";
import SearchDep from "../assets/search.gif";
import Upload from "../assets/upload.png";
import { searchRepositories } from "../config/axios.config";
import "./style.css";

function Home() {
  const [projectName, setProjectName] = useState("");
  const [depName, setDepName] = useState("");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setProjectName(json.name || "Unknown Project");

          const dependencies = [
            ...Object.keys(json.dependencies || {}),
            ...Object.keys(json.devDependencies || {}),
          ];

          setTableData([]);
          setLoading(true);
          setError("");

          const fetchedData = await Promise.all(
            dependencies.map(async (dep) => {
              try {
                const response = await searchRepositories(dep);
                if (response instanceof Error) {
                  setError(response.message);
                  return null;
                }
                const repoData = response.data.items[0];
                return {
                  ...repoData,
                  originalName: dep,
                };
              } catch (error) {
                console.error(`Error fetching data for ${dep}:`, error);
                return null;
              }
            })
          );

          setTableData(fetchedData.filter(Boolean));
        } catch (error) {
          console.error("Error parsing JSON or fetching dependencies:", error);
          alert("Invalid JSON format or data could not be fetched.");
        } finally {
          setLoading(false);
        }
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid package.json file.");
    }

    // Allow reselecting the same file
    event.target.value = null;
  };

  const handleSearch = async () => {
    if (depName.trim() !== "") {
      try {
        setLoading(true);
        setError("");
        const response = await searchRepositories(depName);
        if (response instanceof Error) {
          setError(response.message);
        } else {
          if (response && response.data.items.length > 0) {
            setTableData([
              {
                ...response.data.items[0],
                originalName: depName,
              },
            ]);
          } else {
            setTableData([]);
            alert("No data found for the specified dependency.");
          }
        }
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
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
        <label className="upload-button">
          <img src={Upload} alt="upload-icon" />
          Import package.json
          <input
            type="file"
            accept="application/json"
            style={{ display: "none" }}
            onClick={(e) => (e.target.value = null)} // Clear previous file
            onChange={handleFileUpload}
          />
        </label>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Dependency</th>
              <th>Stars</th>
              <th>Forks</th>
              <th>Homepage</th>
              <th>Descriptor</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="loader">
                <td colSpan="6">
                  <img src={SearchDep} width={96} alt="Loading..." />
                </td>
              </tr>
            ) : tableData.length > 0 ? (
              tableData.map((repo, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{repo.originalName}</td>
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
                <td colSpan="6" className="no-data">
                  {error || "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="note">
        Free Trial Supports Only 60 dependency/package.json OR For Full Version
        Refer{" "}
        <a href="https://github.com/deshmukh-ajinkya/packageanalyzer">Readme</a>
      </div>
    </>
  );
}

export default Home;
