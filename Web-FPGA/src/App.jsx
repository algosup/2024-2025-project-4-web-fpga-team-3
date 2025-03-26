import { useState, useEffect } from "react";
import SDFParser from "./services/Parser.js";
import transformData from "./services/Transform.js";
import "./App.css";

function App() {
	const [file, setFile] = useState(null);
	const [fileUploaded, setFileUploaded] = useState(false);
	const [result, setResult] = useState([]);
	const [error, setError] = useState("");
	const [cubeColors, setCubeColors] = useState({});

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

				localStorage.setItem(
					"transformedJson",
					JSON.stringify(transformedJson)
				);

				setResult(transformedJson.nodes);
				setFileUploaded(true);
			} catch (error) {
				setError("Error parsing or transforming the file.");
			}
		};

		reader.readAsText(file);
	};

	useEffect(() => {
		const colors = {};
		result.forEach(node => {
			if (node.id.toLowerCase().includes("lut")) {
				colors[`${node.type}-${node.id}`] = "#FF0000"; // Red color for "lut"
      }
      if (node.id.toLowerCase().includes("dff")) {
        colors[`${node.type}-${node.id}`] = "#008000"; // Green color for "lut"
			}
		});
		setCubeColors(colors);
	}, [result]);

	const groupedNodes = result.reduce((acc, node) => {
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
				<div className="upload-section">
					<input
						className="uploadButton"
						type="file"
						accept=".sdf"
						onChange={handleFileChange}
					/>
					<button className="uploadButton" onClick={handleUpload}>Upload</button>
				</div>
			</header>

			<section className="main-content">
				<div className="simulation-cube">
					<h2>Simulation</h2>
					<div className="columns-container">
						{Object.keys(groupedNodes).map((type, idx) => (
							<div key={idx} className="column">
								<h3>{type}</h3>
								<div className={`id-cubes-container -${idx + 1}`}>
									{groupedNodes[type].map((node, nodeIdx) => (
										<div
											key={nodeIdx}
											className={`id-cube -${nodeIdx + 1}`}
											style={{ backgroundColor: cubeColors[`${type}-${node.id}`] || 'white' }}
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

{ <footer className="buttons-zoom">
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
</footer> }
</div>
);
}

export default App;
