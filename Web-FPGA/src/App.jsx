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
  const [isAnimating, setIsAnimating] = useState(false);
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

        // Ensure we extract 'nodes' and 'edges' properly
        const nodes = transformedJson.nodes || [];
        const edges = transformedJson.edges || [];

        console.log("Nodes:", nodes);
        console.log("Edges:", edges);

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
        colors[`${node.type}-${node.id}`] = "#d3d3d3"; // Gray for LUT
      }
      if (
        node.id.toLowerCase().includes("dff") ||
        node.id.toLowerCase().includes("latch")
      ) {
        colors[`${node.type}-${node.id}`] = "#47697a"; // Green for DFF/Latch
      }
    });
    setCubeColors(colors);

    // Step 2: Draw edges
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous paths

    result.edges.forEach(({ source, target }) => {
      if (!target) {
        console.warn(`Skipping edge: source=${source}, target=`);
        return; // Skip this edge if target is empty
      }

      console.log(`Creating edge between: ${source} and ${target}`);

      const sourceBaseId = source.replace(/_output_.*/, "");
      const targetBaseId = target.replace(/_input_.*/, "");

      const sourceEl = document.getElementById(sourceBaseId);
      const targetEl = document.getElementById(targetBaseId);

      if (!sourceEl || !targetEl) {
        console.error(`Missing element: ${sourceBaseId}, ${targetBaseId}`);
        return;
      }

      // Get positions relative to simulation container
      const sourceRect = sourceEl.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();
      const parentRect = simulationCubeRef.current.getBoundingClientRect();

      // Get the position of the source and target elements relative to the parent container
      let starterX = sourceRect.right - parentRect.left;
      let sourceX = sourceRect.right - parentRect.left + 10;
      let sourceY = sourceRect.top + sourceRect.height / 2 - parentRect.top;

      let endingX = targetRect.left - parentRect.left;
      let targetX = targetRect.left - parentRect.left - 10;
      let targetY = targetRect.top + targetRect.height / 2 - parentRect.top;

      // Add a 20px gap between elements in the same column to help the path placement
      const columnGap = 20; // The gap between boxes in the same column

      // Calculate the vertical curve height to make the connection visually pleasant
      const distance = Math.abs(sourceX - targetX); // Distance between X coordinates
      const curveHeight = Math.max(distance / 4, 50); // Adjust curve height

      // Calculate the vertical offset (half the height of the box + 20 pixels) before moving left/right
      const verticalOffset = Math.max(
        sourceRect.height / 2 + 20,
        targetRect.height / 2 + 20
      ); // Adjust with 20px added

      // Logic to handle different cases for path creation
      let pathData = "";

      if (sourceX < targetX) {
        // Source is to the left of the target (standard left-to-right case)
        pathData = `
    M ${starterX} ${sourceY}
    L ${starterX} ${sourceY - verticalOffset}   // Move up from source
    C ${sourceX + distance / 2} ${sourceY - verticalOffset} ${
          targetX - distance / 2
        } ${sourceY - verticalOffset} ${endingX} ${targetY}
  `;
      } else if (sourceX === targetX) {
        // Source and target are on the same vertical line
        // Use the gap to position the curve properly
        pathData = `
    M ${starterX} ${sourceY}
    L ${starterX} ${sourceY - verticalOffset}  // Move up from source
    L ${endingX} ${sourceY - verticalOffset}   // Move up to the target Y
    L ${endingX} ${targetY}                    // Connect to target Y
  `;
      } else {
        // Source is to the right of the target (reverse logic)
        // Subtract the width of the source box to position it correctly at the right edge
        sourceX = sourceRect.right - parentRect.left - sourceRect.width;

        // Use the gap to adjust the path
        pathData = `
    M ${starterX} ${sourceY}
    L ${starterX} ${sourceY - verticalOffset}   // Move up from source
    C ${sourceX - distance / 2} ${sourceY - verticalOffset} ${
          targetX + distance / 2
        } ${sourceY - verticalOffset} ${endingX} ${targetY}
  `;
      }

      console.log("Edge path data:", pathData); // Log path data

      // Create the path
      const edge = svg
        .append("path")
        .attr("d", pathData)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 2);

      // Create a small moving electron
      const electron = svg
        .append("circle")
        .attr("r", 5)
        .attr("fill", Math.random() > 0.5 ? "blue" : "yellow");

      // Get total length of the path
      const pathLength = edge.node().getTotalLength();

      // Step 3: Apply animation when isAnimating is true
      const animateStroke = () => {
        if (!isAnimating) return;

        edge
          .transition()
          .duration(1000)
          .ease(d3.easeLinear)
          .attr("stroke-width", 6)
          .attr("stroke", "rgb(255, 100, 100)")
          .transition()
          .duration(500)
          .attr("stroke-width", 2)
          .attr("stroke", "red")
          .on("end", animateStroke);
      };

      const animateElectron = () => {
        if (!isAnimating) return;

        electron
          .transition()
          .duration(2000) // Adjust speed of electron movement
          .ease(d3.easeLinear)
          .attrTween("transform", function () {
            return function (t) {
              const { x, y } = edge.node().getPointAtLength(t * pathLength);
              return `translate(${x},${y})`;
            };
          })
          .on("end", () => {
            animateElectron(); // Restart animation
          });
      };

      if (isAnimating) {
        animateStroke();
        animateElectron();
      }
    });

    // Step 4: Enable panning
    const cleanup = enablePanning(simulationCubeRef);
    return cleanup;
  }, [result, isAnimating]);

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
            <button onClick={() => setIsAnimating((prev) => !prev)}>
              {isAnimating ? "⏸️" : "▶️"}
            </button>
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
                      id={node.id} // Set the full ID here
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
    </div>
  );
}

export default App;
