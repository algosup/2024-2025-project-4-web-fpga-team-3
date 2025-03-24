import { useState } from "react";
import SDFParser from "./services/Parser.js";
import transformData from "./services/Transform.js";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const fileInput = event.target.files[0];
    setFile(fileInput);
    setError(""); // Réinitialiser l'erreur lors de la sélection d'un nouveau fichier
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
        // Parser le contenu SDF en JSON
        const parser = new SDFParser();
        const parsedJson = parser.parseSDF(sdfContent);

        // Transformer le JSON dans un format organisé
        const transformedJson = transformData(parsedJson);

        // Afficher le résultat final
        setResult(JSON.stringify(transformedJson, null, 2));
      } catch (error) {
        console.error("Erreur lors du traitement du fichier:", error);
        setError(
          "Erreur lors de l'analyse ou de la transformation du fichier."
        );
      }
    };

    reader.readAsText(file);
  };

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
          <pre>{result}</pre> {/* Affichage du résultat JSON transformé */}
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
