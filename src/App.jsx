import Logo from "./assets/logo.png";
import Approve from "./assets/approve.png";
import Reject from "./assets/reject.png";
import Search from "./assets/search.png";
import Upload from "./assets/upload.png";
import "./App.css";
import { searchRepositories } from "./config/axios.config";
import { useState, useRef } from "react";

function App() {
  const [projectName, setProjectName] = useState(""); // State for project name
  const [depName, setDepName] = useState("");
  const [tableData, setTableData] = useState([]);
  const fileInputRef = useRef(null);

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const json = JSON.parse(e.target.result);
        setProjectName(json.name || "Unknown Project"); // Extract project name
        const dependencies = Object.keys(json.dependencies || {});
        setTableData([]); // Clear the table data initially

        const fetchedData = await Promise.all(
          dependencies.map(async (dep) => {
            try {
              const response = await searchRepositories(dep);
              if (response && response.data.items.length > 0) {
                return response.data.items[0]; // Get the first match for simplicity
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

  // Handle the search by dependency name
  const handleSearch = async () => {
    if (depName.trim() !== "") {
      try {
        const response = await searchRepositories(depName);
        if (response && response.data.items.length > 0) {
          setTableData([response.data.items[0]]); // Set only the first match
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
      <div
        style={{ padding: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}
      >
        <img src={Logo} alt="logo" width={200} />
      </div>
      <div
        style={{
          marginTop: "18px",
          paddingInline: "16px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <p
          style={{
            flex: 3,
            color: "#008AE6",
            fontSize: "20px",
            fontWeight: 600,
          }}
        >
          Project Name: <span style={{ color: "#000000" }}>{projectName}</span>
        </p>
        <input
          type="text"
          style={{
            flex: 2,
            height: "36px",
            borderRadius: "4px",
            border: "1px solid #D6D6D6",
            paddingInline: "12px",
          }}
          placeholder="Enter Dependency Name"
          value={depName}
          onChange={(e) => setDepName(e.target.value)}
        />
        <img
          src={Search}
          alt="search-icon"
          style={{ cursor: "pointer" }}
          onClick={handleSearch} // Trigger search on click
        />
        <button
          onClick={handleUploadClick}
          style={{
            flex: 1,
            height: "43px",
            borderRadius: "24px",
            backgroundColor: "#FFA500",
            color: "#ffffff",
            border: "2px solid #D6D6D6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <img src={Upload} alt="upload-icon" width="20px" />
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
      <div
        style={{
          border: "1px solid #D6D6D6",
          marginInline: "12px",
          borderRadius: "8px",
          marginTop: "16px",
          overflowX: "scroll",
          scrollbarWidth: "none",
        }}
      >
        <table
          width={"100%"}
          style={{
            paddingInline: "12px",
            textAlign: "left",
            borderSpacing: "0px 12px",
          }}
        >
          <thead>
            <tr>
              <th style={{ fontSize: "18px", fontWeight: 600 }}>Dependency</th>
              <th style={{ fontSize: "18px", fontWeight: 600 }}>Stars</th>
              <th style={{ fontSize: "18px", fontWeight: 600 }}>Forks</th>
              <th style={{ fontSize: "18px", fontWeight: 600 }}>Homepage</th>
              <th style={{ fontSize: "18px", fontWeight: 600 }}>Descriptor</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length > 0 ? (
              tableData.map((repo, index) => (
                <tr key={index}>
                  <td
                    style={{
                      maxWidth: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {repo.name}
                  </td>
                  <td>{repo.stargazers_count}</td>
                  <td>{repo.forks_count}</td>
                  <td
                    style={{
                      maxWidth: "120px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
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
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    {repo.stargazers_count > 1000 ? (
                      <>
                        <img
                          src={Approve}
                          alt="approve"
                          width="12px"
                          height="12px"
                        />
                        <p>Reliable</p>
                      </>
                    ) : (
                      <>
                        <img
                          src={Reject}
                          alt="reject"
                          width="12px"
                          height="12px"
                        />
                        <p>Unreliable</p>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
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
