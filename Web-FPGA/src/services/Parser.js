//-----------------------------------------------------------------------------------------------
// The purpose of this file is to handle .sdf files and transform relevant data into JSON format.
//-----------------------------------------------------------------------------------------------

class SDFParser {
  constructor() {
    this.result = { cells: [] };
  }

  // Template for JSON format
  createNewCell() {
    return { type: "", start: "", end: "", delays: [] };
  }

  // Detect if some parts of the template are already filled.
  isCellFilled(cell) {
    return (
      cell.type !== "" ||
      cell.start !== "" ||
      cell.end !== "" ||
      cell.delays.length > 0
    );
  }

  parseSDF(fileContent) {
    const lines = fileContent.split("\n");
    let currentCell = null;

    lines.forEach((line) => {
      line = line.trim();

      // Check if the line starts a new cell
      if (line.startsWith("(CELL ") || line === "(CELL") {
        // Only push the previous cell if it was filled
        if (currentCell && this.isCellFilled(currentCell)) {
          this.result.cells.push(currentCell);
        }
        // Create a new cell
        currentCell = this.createNewCell();
      }

      // Extract celltype
      else if (line.startsWith("(CELLTYPE")) {
        currentCell.type = this.extractCellTypeValue(line);
      }

      // Extract instance
      else if (line.startsWith("(INSTANCE")) {
        const instanceValues = this.extractInstanceValue(line);

        // Handle instance parsing for "start" and "end" values
        if (instanceValues.start && instanceValues.end) {
          currentCell.start = instanceValues.start;
          currentCell.end = instanceValues.end;
        } else {
          // Assign a default value if "end" is missing
          currentCell.start = instanceValues.start;
          currentCell.end = instanceValues.end || "unknown_target";
        }
      }

      // Extract delay
      else if (line.startsWith("(IOPATH")) {
        const delayValues = this.extractDelayValues(line);
        if (currentCell) {
          currentCell.delays.push(delayValues.datain[1]);
        }
      }
    });

    // Push the last cell if it's filled
    if (currentCell && this.isCellFilled(currentCell)) {
      this.result.cells.push(currentCell);
    }
    return this.result;
  }

  //--------------------------------------------------------------------------------
  // Extracting infos from the SDF file
  //--------------------------------------------------------------------------------

  // Extract the celltype from a line containing (CELLTYPE "")
  extractCellTypeValue(line) {
    const match = line.match(/\(CELLTYPE\s+"([^"]+)"\)/);
    return match ? match[1] : null;
  }

  // Clean instance names by removing special characters and simplifying names
  cleanInstanceName(name) {
    if (!name) return "Unknown";

    name = name.replace(/^routing_segment_/, "");

    name = name.replace(/latch_\$sdff\~\d+\^Q\~\d+/, "latch_Q");

    name = name.replace(/lut_.*?\$(\d+)/, "lut_$1");

    name = name.replace(/[\\$~^:]/g, "");

    return name;
  }

  // Extract start and end signals, ensuring proper routing segment formatting
  extractInstanceValue(line) {
    const match = line.match(/\(INSTANCE\s+([^\s\)]+)\)/);
    if (match) {
      let instanceName = match[1];

      if (instanceName.includes("_to_")) {
        const parts = instanceName.split("_to_");
        return {
          start: this.cleanInstanceName(parts[0]),
          end: this.cleanInstanceName(parts.slice(1).join("_to_")),
        };
      }
      // Default case where the target might be missing
      return {
        start: this.cleanInstanceName(instanceName),
        end: "unknown_target",
      };
    }
    return { start: null, end: null };
  }

  // Extract delay values
  extractDelayValues(line) {
    const match = line.match(/\(([^)]+)\)\s+\(([^)]+)\)/);
    if (match) {
      const [datain, dataout] = match
        .slice(1, 3)
        .map((str) => str.split(":").map(Number));
      return { datain, dataout };
    }
    return null;
  }
}

export default SDFParser;
