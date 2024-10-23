import "./App.css";
import Logo from "./assets/logo.png";
import Approve from "./assets/approve.png";
import Reject from "./assets/reject.png";
import Search from "./assets/search.png";
import Download from "./assets/download.png";
import Upload from "./assets/upload.png";

function App() {
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
            />
          </span>
        </div>
        <button
          style={{
            flex: 1,
            height: "43px",
            borderRadius: "6px",
            backgroundColor: "#81E681",
            color: "#ffffff",
            border: "2px solid #D6D6D6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <img src={Download} alt="download-icon" width="20px" />
          Download
        </button>
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
          <tr style={{ marginBlock: "12px" }}>
            <th style={{ fontSize: "18px", fontWeight: 600 }}>
              Dependency Name
            </th>
            <th style={{ fontSize: "18px", fontWeight: 600 }}>Stars</th>
            <th style={{ fontSize: "18px", fontWeight: 600 }}>Contributors</th>
            <th style={{ fontSize: "18px", fontWeight: 600 }}>Watching</th>
            <th style={{ fontSize: "18px", fontWeight: 600 }}>Forks</th>
            <th style={{ fontSize: "18px", fontWeight: 600 }}>Status</th>
          </tr>
          <tr>
            <td>React.js</td>
            <td>229K</td>
            <td>1k</td>
            <td>6k</td>
            <td>48k</td>
            <td>
              <img src={Approve} alt="approve" width="12px" />
            </td>
          </tr>
          <tr>
            <td>Weak.js</td>
            <td>2</td>
            <td>1</td>
            <td>6</td>
            <td>4</td>
            <td>
              <img src={Reject} alt="reject" width="12px" />
            </td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default App;
