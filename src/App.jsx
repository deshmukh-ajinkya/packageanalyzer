import Logo from "./assets/logo.png";
import Approve from "./assets/approve.png";
import Reject from "./assets/reject.png";
import Search from "./assets/search.png";
import Upload from "./assets/upload.png";
import "./App.css";
import { searchRepositories } from "./config/axios.config";
import { useState, useRef } from "react";

function App() {
  const [depName, setDepName] = useState("");
  const [tableData, setTableData] = useState([]);
  const fileInputRef = useRef(null);

  // Handle the file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const json = JSON.parse(e.target.result);
        const dependencies = Object.keys(json.dependencies || {});
        setTableData([]); // Clear the table data initially

        // Fetch repository data for each dependency
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

        // Filter out any null results and set the table data
        setTableData(fetchedData.filter(Boolean));
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid package.json file.");
    }
  };

  // Trigger file input click on button click
  const handleUploadClick = () => {
    fileInputRef.current.click();
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
          paddingInline: "16px",
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleUploadClick}
          style={{
            marginTop: "24px",
            flex: 1,
            height: "43px",
            borderRadius: "6px",
            backgroundColor: "#FFA500",
            color: "#ffffff",
            border: "2px solid #D6D6D6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img src={Upload} alt="upload-icon" width="20px" />
          Upload
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
              <th style={{ fontSize: "18px", fontWeight: 600 }}>
                Dependency Name
              </th>
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
