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
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleFileChange = (event) => {
    const fileInput = event.target.files[0];
    setFile(fileInput);
    setFileUploaded(false);
    setError("");
    setResult({ nodes: [], edges: [] }); // Reset the result state
    setCubeColors({}); // Reset the cube colors
    setIsAnimating(false); // Stop any ongoing animations
  };

  const handleUpload = async () => {
    const now = new Date().toLocaleTimeString();
	  const action = "🧹 Board reset — New simulation rendered";
	  setLogs((prevLogs) => [...prevLogs, { time: now, action }]);
    if (!file) {
      const errorMsg = "Please select an SDF file."; // Check if a file is selected
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
      return;
    }
    

    const fileName = file.name.toLowerCase(); // Check the file name
    if (!fileName.endsWith(".sdf")) {
      // Check if the file is an SDF file
      const errorMsg = "Invalid file type. Please upload an SDF file.";
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
      return;
    }

    const fileText = await file.text(); // Read the file content
    if (fileText.trim() === "") {
      // Check if the file is empty
      const errorMsg = "The selected .sdf file is empty.";
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
      return;
    }
    const hasDelayFile = fileText.includes("(DELAYFILE");
    const hasCell = fileText.includes("(CELL");
    const hasDelay = fileText.includes("(DELAY");

    if (!hasDelayFile || !hasCell || !hasDelay) {
      const errorMsg = "Invalid SDF structure. Required SDF blocks not found.";
      setError(errorMsg);
      alert(`Error: ${errorMsg}`);
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
      if (node.type === "LUT" || node.id.toLowerCase().includes("lut")) {
        colors[`${node.type}-${node.id}`] = "#d3d3d3"; // Gray for LUT
      }
      if (node.type === "DFF" || node.id.toLowerCase().includes("dff")) {
        colors[`${node.type}-${node.id}`] = "#47697a"; // Blue for DFF
      }
      if (node.type === "CLOCK" || node.id.toLowerCase().includes("clk")) {
        colors[`${node.type}-${node.id}`] = "#ffd700"; // Gold for clock
      }
      if (node.type === "Q_COLUMN" || node.id.toLowerCase().includes("Q")) {
        colors[`${node.type}-${node.id}`] = "#ffd700"; // Gold for clock
      }
    });
    setCubeColors(colors);

    // Step 2: Draw edges
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    result.edges.forEach(({ source, target, isClock }) => {
      if (!target) {
        console.warn(`Skipping edge: source=${source}, target=`);
        return;
      }

      const sourceBaseId = source.replace(/_(output|clock|input)_\d+_\d+$/, "");
      const targetBaseId = target.replace(/_(output|clock|input)_\d+_\d+$/, "");

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

      // Assuming all boxes are 100x100, so width and height are fixed
      const boxSize = 100;
      const boxHalf = boxSize / 2;
      const columnGap = 20; // Add a gap between columns

      // Get the position of the source and target elements relative to the parent container
      let starterX = sourceRect.right - parentRect.left;
      let sourceX = sourceRect.right - parentRect.left + 10;
      let sourceY = sourceRect.top + sourceRect.height / 2 - parentRect.top;

      let endingX = targetRect.left - parentRect.left;
      let targetX = targetRect.left - parentRect.left - 15;
      let targetY = targetRect.top + targetRect.height / 2 - parentRect.top;

      // Logic to handle different cases for path creation
      let pathData = "";

      // Case 1: Source → Target (on the right, next column)
      if (starterX < endingX) {
        pathData = `
          M ${starterX} ${sourceY}
          L ${sourceX} ${sourceY}
          L ${sourceX} ${sourceY - boxHalf - columnGap / 4}
          L ${targetX - 20} ${sourceY - boxHalf - columnGap / 4}
          L ${targetX - 20} ${targetY}
          L ${targetX} ${targetY}
          L ${endingX} ${targetY}
        `;
      }
      // Case 2 Source ← Target (on the left, previous column)
      else if (starterX - endingX !== boxSize) {
        pathData = `
          M ${starterX} ${sourceY}
          L ${sourceX} ${sourceY}
          L ${sourceX} ${sourceY + boxHalf + columnGap / 4}
          L ${targetX} ${sourceY + boxHalf + columnGap / 4}
          L ${targetX} ${targetY}
          L ${endingX} ${targetY}
        `;
      }
      // Case 3: Source and Target are in the same column
      else {
        pathData = `
          M ${starterX} ${sourceY}
          L ${sourceX} ${sourceY}
          L ${sourceX} ${sourceY + boxHalf + columnGap / 4}
          L ${targetX} ${sourceY + boxHalf + columnGap / 4}
          L ${targetX} ${targetY}
          L ${endingX} ${targetY}
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
        .attr("fill", Math.random() > 0.5 ? "blue" : "yellow")
        .attr("opacity", 0);

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
          .attr("opacity", 1)
          .raise()
          .transition()
          .duration(3000) // Adjust speed of electron movement
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

    const cleanup = enablePanning(simulationCubeRef, svgRef);
    return cleanup;
  }, [result, isAnimating]);

  // Sort nodes to ensure CLOCK type appears after DFF
  const groupedNodes = result.nodes.reduce((acc, node) => {
    if (!acc[node.type]) {
      acc[node.type] = [];
    }
    acc[node.type].push(node);
    return acc;
  }, {});

  // Ensure proper ordering of columns (LUT, DFF, CLOCK)
  const orderedTypes = ["CLOCK", "LUT", "DFF"].filter(
    (type) => groupedNodes[type]
  );

  const [logs, setLogs] = useState([]);

  const handleClick = (buttonName) => {
	const now = new Date().toLocaleTimeString();
	const action = `Button ${buttonName} Clicked`;
	setLogs((prevLogs) => [...prevLogs, { time: now, action }]);
};

  return (
    <div className="app">
      <header className={`top-bar ${fileUploaded ? "shifted" : ""}`}>
        <div className="logo">FPGA Simulator</div>
        {fileUploaded && (
          <div className="simulation-controls">
            {/* <button>⏪</button>
            <button>◀️</button>
            <span>X</span> */}
            <button
	onClick={() => {
		const newState = !isAnimating;
		setIsAnimating(newState);

		const now = new Date().toLocaleTimeString();
		const action = newState ? "▶️ Animation Started" : "⏸️ Animation Paused";

		setLogs((prevLogs) => [...prevLogs, { time: now, action }]);
	}}
>
	{isAnimating ? "⏸️" : "▶️"}
</button>
            {/* <button>⏩</button> */}
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
        <div
          className="simulation-cube"
          ref={simulationCubeRef}
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center",
          }}
        >
          <h2>Simulation</h2>

          <svg
            ref={svgRef}
            className="connections-layer"
            width="100%"
            height="100%"
          >
            <g
              transform={`scale(${zoomLevel})`}
              style={{ transformOrigin: "center" }}
            >
              {/* The wires will be drawn here */}
            </g>
          </svg>
          <svg
            ref={svgRef}
            className="connections-layer"
            width="100%"
            height="100%"
          ></svg>

          <div className="columns-container">
            {orderedTypes.map((type, idx) => (
              <div key={type} className="column">
                {type === "CLOCK" ? (
                  <h3>DATA IN</h3> // Add a "DATA IN" title for the CLOCK column
                ) : (
                  <h3>{type}</h3> // Add a header for other columns
                )}
                <div className={`id-cubes-container -${idx + 1}`}>
                  {groupedNodes[type].map((node, nodeIdx) => (
                    <div
                      key={`${node.id}-${nodeIdx}`}
                      className={`id-cube ${type.toLowerCase()}-node`}
                      id={node.id}
                      style={{
                        backgroundColor:
                          cubeColors[`${type}-${node.id}`] || "white",
                      }}
                    >
                      {node.id}
                    </div>
                  ))}
                  {/* Add D and reset boxes specifically for the CLOCK column */}
                  {type === "CLOCK" && (
                    <>
                      <div
                        className="id-cube clock-node"
                        id="D"
                        style={{
                          backgroundColor: cubeColors["CLOCK-clk"] || "white", // Use the same color as the clk box
                        }}
                      >
                        Input
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
            {/* Add the Q_COLUMN only if a clock node exists */}
            {fileUploaded &&
              result.nodes.some((node) => node.type === "CLOCK") && (
                <div className="column">
                  <h3>DATA OUT</h3>
                  <div className="id-cubes-container">
                    <div
                      className="id-cube q-node"
                      id="Q"
                      style={{
                        backgroundColor: cubeColors["CLOCK-clk"] || "white", // Use the same color as the clk box
                      }}
                    >
                      Output
                    </div>
                  </div>
                </div>
              )}
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
            <tbody>
            {logs.map((log, index) => (
							<tr key={index}>
								<td>{log.time}</td>
								<td>{log.action}</td>
							</tr>
						))}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="buttons-zoom">
        <button
          className="zoomButton"
          data-tooltip="Zoom Out"
          aria-label="Zoom Out"
          onClick={() => setZoomLevel((prev) => Math.max(prev * 0.8, 0.8))}
        >
          <span aria-hidden="true">&#128270;</span>
        </button>
        <button
          className="zoomButton"
          data-tooltip="View Reset"
          aria-label="Reset"
          onClick={() => {
            setZoomLevel(1); // Reset zoom level to 1

            const simulationCube = d3.select(simulationCubeRef.current);
            const svg = d3.select(svgRef.current);
            const columnsContainer =
              simulationCube.select(".columns-container");
            const title = simulationCube.select("h2"); // Select the title element

            // Reset panning offsets
            simulationCube.style("transform", "translate(0px, 0px)");
            svg.style("transform", "translate(0px, 0px)");
            columnsContainer.style("transform", "translate(0px, 0px)");
            title.style("transform", "translate(0px, 0px)"); // Reset the title's transform
          }}
        >
          <span aria-hidden="true">&#x21BA;</span>
        </button>

        <button
          className="zoomButton"
          data-tooltip="Zoom In"
          aria-label="Zoom In"
          onClick={() => setZoomLevel((prev) => Math.min(prev * 1.2, 1.3))}
        >
          <span aria-hidden="true">&#128269;</span>
        </button>
      </footer>
    </div>
    
  );
}

export default App;
