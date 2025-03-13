//-----------------------------------------------------------------------------------------------
// The purpose of this file is to handle .sdf files and transform relevant data into JSON format.
//-----------------------------------------------------------------------------------------------

class SDFParser {
    constructor() {
        this.result = { cells: [] };
    }

    // Template for JSON format
    createNewCell() {
        return { type: '', start: '', end: '', delays: [] };
    }

    // Detect if some parts of the template are already filled.
    isCellFilled(cell) {
        return cell.type !== '' || cell.start !== '' || cell.end !== '' || cell.delays.length > 0;
    }

    parseSDF(fileContent) {
        const lines = fileContent.split('\n');
        let currentCell = null;

        lines.forEach(line => {
            line = line.trim();

            // Check if the line starts a new cell
            if (line.startsWith('(CELL ') || line === '(CELL') { 
                // Only push the previous cell if it was filled
                if (currentCell && this.isCellFilled(currentCell)) {
                    this.result.cells.push(currentCell);
                }
                // Create a new cell
                currentCell = this.createNewCell();
            } 

            // Extract celltype
            else if (line.startsWith('(CELLTYPE')) {
                currentCell.type = this.extractCellTypeValue(line);
            } 

            // Extract instance
            else if (line.startsWith('(INSTANCE')) {
                const instanceValues = this.extractInstanceValue(line);
                currentCell.start = instanceValues.start;
                currentCell.end = instanceValues.end;
            }            

            // Extract delay
            else if (line.startsWith('(IOPATH')) {
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

    // Extract start and end signals, what comes before _to_ will go in start and what comes after _to_ will go in end, if there is no _to_, everything stay in start
    extractInstanceValue(line) {
        const match = line.match(/\(INSTANCE\s+([^\s\)]+)\)/);
        if (match) {
            const parts = match[1].split('_to_');
            return { start: parts[0], end: parts.length > 1 ? parts.slice(1).join('_to_') : '' };
        }
        return { start: null, end: null };
    }

    // Extract delay values
    extractDelayValues(line) {
        const match = line.match(/\(([^)]+)\)\s+\(([^)]+)\)/);
        if (match) {
            const [datain, dataout] = match.slice(1, 3).map(str => str.split(':').map(Number));
            return { datain, dataout };
        }
        return null;
    }
}

export default SDFParser;