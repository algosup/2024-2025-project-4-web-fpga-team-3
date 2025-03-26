import { useState, useEffect, useRef } from "react";
import SDFParser from "./services/Parser.js";
import transformData from "./services/Transform.js";
import { enablePanning } from "./services/Simulator.js";
import * as d3 from "d3";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [result, setResult] = useState({ nodes: [], edges: [] });
  const [error, setError] = useState("");
  const [cubeColors, setCubeColors] = useState({});
  const simulationCubeRef = useRef(null);
  const svgRef = useRef(null);

  const handleFileChange = (event) => {
    const fileInput = event.target.files[0];
    setFile(fileInput);
    setFileUploaded(false);
    setError("");
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
        const parser = new SDFParser();
        const parsedJson = parser.parseSDF(sdfContent);
        const transformedJson = transformData(parsedJson);

        console.log("Transformed JSON: ", transformedJson); // Log for debugging

        localStorage.setItem(
          "transformedJson",
          JSON.stringify(transformedJson)
        );

        // Make sure we extract 'nodes' and 'edges' properly from transformedJson
        const nodes = transformedJson.nodes || []; // Ensure nodes is always an array
        const edges = transformedJson.edges || []; // Ensure edges is always an array

        setResult({ nodes, edges });
        setFileUploaded(true);
      } catch (error) {
        setError("Error parsing or transforming the file.");
        console.error(error);
      }
    };

    reader.readAsText(file);
  };

  useEffect(() => {
    // Step 1: Define and apply colors for nodes
    const colors = {};
    result.nodes.forEach((node) => {
      if (node.id.toLowerCase().includes("lut")) {
        colors[`${node.type}-${node.id}`] = "#d3d3d3"; // Gray for "lut"
      }
      if (node.id.toLowerCase().includes("dff")) {
        colors[`${node.type}-${node.id}`] = "#47697a"; // Green for "dff"
      } else if (node.id.toLowerCase().includes("latch")) {
        colors[`${node.type}-${node.id}`] = "#47697a"; // Green for "latch"
      }
    });
    setCubeColors(colors);

    // Step 2: Draw edges once nodes are processed
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear any previous connections

    if (!Array.isArray(result.edges) || result.edges.length === 0) {
      console.error("No edges found!");
      return;
    }

    // Step 3: Loop over edges and draw paths
    result.edges.forEach(({ source, target }) => {
      // Extract base node IDs from source/target (remove output/input parts)
      const sourceBaseId = source.replace(/_output_.*/, "");
      const targetBaseId = target.replace(/_input_.*/, "");

      // Ensure the source and target elements exist
      const sourceEl = document.getElementById(sourceBaseId);
      const targetEl = document.getElementById(targetBaseId);

      if (!sourceEl || !targetEl) {
        console.error(
          `Source or target element not found: ${sourceBaseId}, ${targetBaseId}`
        );
        return;
      }

      // Get the bounding rectangles of source and target
      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const parentRect = simulationCubeRef.current.getBoundingClientRect();

      let sourceX = sourceRect.right - parentRect.left + 10;
      let sourceY = sourceRect.top + sourceRect.height / 2 - parentRect.top;
      let targetX = targetRect.left - parentRect.left - 10;
      let targetY = targetRect.top + targetRect.height / 2 - parentRect.top;

      const down = sourceRect.height / 2 + 10;
      const middleY = sourceY + down;

      const up = targetRect.height / 2 + 10;
      const middleTargetY = targetY - up;

      let forwardX;
      let backwardX;

      let tempX = sourceX;
      if (sourceX > targetX) {
        tempX -= 20;
        forwardX = tempX - sourceRect.width;
      } else {
        tempX += 20;
        forwardX = tempX + sourceRect.width;
      }

      let tempX2 = targetX;
      if (sourceX > targetX) {
        tempX2 += 20;
        backwardX = tempX2 + targetRect.width;
      } else {
        tempX2 -= 20;
        backwardX = tempX2 - targetRect.width;
      }

      const adjustedTargetY = targetY - targetRect.height / 2 - 10;

      const finalTargetX = targetX + targetRect.width + 20;
      let pathData = `
                M ${sourceX} ${sourceY}
                L ${sourceX} ${middleY}
                L ${forwardX} ${middleY}
                L ${backwardX} ${middleTargetY}
                L ${targetX} ${middleTargetY}
                L ${targetX} ${targetY}
                `;

      // Draw the edge path
      svg
        .append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2);
    });

    // Step 4: Handle panning
    const cleanup = enablePanning(simulationCubeRef);
    return cleanup;
  }, [result]);

  const groupedNodes = result.nodes.reduce((acc, node) => {
    if (!acc[node.type]) {
      acc[node.type] = [];
    }
    acc[node.type].push(node);
    return acc;
  }, {});

  return (
    <div className="app">
      <header className={`top-bar ${fileUploaded ? "shifted" : ""}`}>
        <div className="logo">FPGA Simulator</div>
        {fileUploaded && (
          <div className="simulation-controls">
            <button>⏪</button>
            <button>◀️</button>
            <span>X</span>
            <button>▶️</button>
            <button>⏩</button>
          </div>
        )}
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
        <div className="simulation-cube" ref={simulationCubeRef}>
          <h2>Simulation</h2>

          <svg
            ref={svgRef}
            className="connections-layer"
            width="100%" // Adding width and height for SVG
            height="100%"
          ></svg>

          <div className="columns-container">
            {Object.keys(groupedNodes).map((type, idx) => (
              <div key={idx} className="column">
                <h3>{type}</h3>
                <div className={`id-cubes-container -${idx + 1}`}>
                  {groupedNodes[type].map((node, nodeIdx) => (
                    <div
                      key={nodeIdx}
                      className={`id-cube -${nodeIdx + 1}`}
                      id={node.id}
                      style={{
                        backgroundColor:
                          cubeColors[`${type}-${node.id}`] || "white",
                      }}
                    >
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
