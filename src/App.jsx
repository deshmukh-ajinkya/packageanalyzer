import Logo from "./assets/logo.png";
import Approve from "./assets/approve.png";
import Reject from "./assets/reject.png";
import Search from "./assets/search.png";
import Upload from "./assets/upload.png";
import "./App.css";
import { searchRepositories } from "./config/axios.config";
import { useState } from "react";

function App() {
  const [depName, setDepName] = useState("");
  const [data, setData] = useState(null); // Initialize with null

  const handleSearch = async () => {
    const result = await searchRepositories(depName);
    if (
      result &&
      result.data &&
      result.data.items &&
      result.data.items.length > 0
    ) {
      setData(result.data.items[0]); // Set the first repository's data
    } else {
      setData(null); // No results found
    }
  };

  return (
    <>
      <div
        style={{
          padding: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
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
        <p
          style={{
            fontSize: "24px",
            fontWeight: 600,
            flex: 2,
            textWrap: "nowrap",
          }}
        >
          Project Name
        </p>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            width: "100%",
            flex: 2,
          }}
        >
          <input
            style={{
              height: "36px",
              borderRadius: "6px",
              paddingInline: "12px 12px",
              border: "2px solid #D6D6D6",
              width: "100%",
              textAlign: "left",
            }}
            placeholder="Dependency Name"
            onChange={(e) => setDepName(e.target.value)}
          />
          <span
            style={{
              position: "absolute",
              right: "12px",
              top: "8px",
              color: "#A9A9A9",
            }}
          >
            <img
              src={Search}
              alt="search-icon"
              width="24px"
              style={{ alignSelf: "flex-end" }}
              onClick={handleSearch} // Use the handleSearch function
            />
          </span>
        </div>
        <button
          style={{
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
      </div>
      <div
        style={{
          border: "1px solid #D6D6D6",
          marginInline: "12px",
          borderRadius: "8px",
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
            {data ? (
              <tr>
                <td>{data.name}</td>
                <td>{data.stargazers_count}</td>
                <td>{data.forks_count}</td>
                <td>
                  {data.homepage ? (
                    <a
                      href={data.homepage}
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
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  {data.stargazers_count > 1000 ? (
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
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
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
