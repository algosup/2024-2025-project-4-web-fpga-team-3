import { useState } from "react";
import SDFParser from "./services/Parser.js";
import transformData from "./services/Transform.js";
// import Simulation from "./services/Simulator.js";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const fileInput = event.target.files[0];
    setFile(fileInput);
    setError(""); // Reset error when a new file is selected
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an SDF file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const sdfContent = event.target.result;

      try {
        // Parse SDF into JSON
        const parser = new SDFParser();
        const parsedJson = parser.parseSDF(sdfContent);

        // Transform JSON into organized format
        const transformedJson = transformData(parsedJson);

        // Debugging: Log the transformed JSON
        console.log('Transformed JSON:', transformedJson);

        // Store the transformed JSON in localStorage
        localStorage.setItem('transformedJson', JSON.stringify(transformedJson));

        // Debugging: Verify the item is stored in localStorage
        console.log('Stored JSON in localStorage:', localStorage.getItem('transformedJson'));

        // Display final JSON result
        setResult(transformedJson.nodes);
      } catch (error) {
        console.error('Error processing file:', error);
        setError('Error parsing or transforming the file.');
      }
    };

    reader.readAsText(file);
  };

  // Group nodes by type
  const groupedNodes = result.reduce((acc, node) => {
    if (!acc[node.type]) {
      acc[node.type] = [];
    }
    acc[node.type].push(node);
    return acc;
  }, {});

  return (
    <div className="app">
      <header className="top-bar">
        <div className="logo">FPGA Simulator</div>
        <div className="upload-section">
          <input
            className="uploadButton"
            type="file"
            id="fileInput"
            accept=".sdf"
            onChange={handleFileChange}
          />
          <button className="uploadButton" onClick={handleUpload}>
            Upload
          </button>
        </div>
      </header>

      <section className="main-content">
        <div className="simulation-cube">
          <h2>Simulation</h2>
          <div className="columns-container">
            {Object.keys(groupedNodes).map((type, index) => (
              <div key={index} className="column">
                <h3>{type}</h3>
                <div className="id-cubes-container">
                  {groupedNodes[type].map((node, idx) => (
                    <div key={idx} className="id-cube">
                      {node.id}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="logs-cube">
          <h2>Logs</h2>
          <table className="logs-table">
            <thead>
              <tr>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>

      <footer className="buttons-zoom">
        <button
          className="zoomButton"
          data-tooltip="Zoom In"
          aria-label="Zoom In"
        >
          <span aria-hidden="true">&#128269;</span>
        </button>
        <button
          className="zoomButton"
          data-tooltip="View Reset"
          aria-label="Reset"
        >
          <span aria-hidden="true">&#x21BA;</span>
        </button>
        <button
          className="zoomButton"
          data-tooltip="Zoom Out"
          aria-label="Zoom Out"
        >
          <span aria-hidden="true">&#128270;</span>
        </button>
      </footer>
    </div>
  );
}

export default App;