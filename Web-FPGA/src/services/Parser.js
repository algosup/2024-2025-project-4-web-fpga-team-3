import fs from 'fs';
import path from 'path';

class SDFParser {
    constructor() {
        this.result = { cells: [] };
    }

    // Template for JSON format
    createNewCell() {
        return {
            type: '',
            start: '',
            end: '',
            delays: [],
        };
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
                const cellTypeValues = this.extractCellTypeValue(line);
                currentCell.type = cellTypeValues.type;
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
                    if (currentCell.type === 'fpga_interconnect') {
                        currentCell.delays = delayValues.datain[1];
                    } 
                    
                    else {
                        currentCell.delays.push(delayValues.datain[1]);
                    }
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
        if (match) {
            const cellType = match[1];

            return { 
                type: cellType
            };
        }
        return { type: null };
    }

    // Extract start and end signals, what comes before _to_ will go in start and what comes after _to_ will go in end, if there is no _to_, everything stay in start
    extractInstanceValue(line) {
        const match = line.match(/\(INSTANCE\s+([^\s\)]+)\)/);
        if (match) {
            const instanceName = match[1];
            const parts = instanceName.split('_to_');
    
            return {
                start: parts[0],  // Before "_to_"
                end: parts.length > 1 ? parts.slice(1).join('_to_') : '' // After "_to_"
            };
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

//--------------------------------------------------------------------------------
// Creating a .json if there is a .sdf in the same folder
//--------------------------------------------------------------------------------

// Get the file path from command-line arguments or find .sdf file in the current directory
let filePath = process.argv[2];

if (!filePath) {
    const sdfFiles = fs.readdirSync('.').filter(file => path.extname(file).toLowerCase() === '.sdf');

    // Check if there is only one SDF file in the current directory or no SDF file
    if (sdfFiles.length === 1) {
        filePath = sdfFiles[0];
    } 
    
    else if (sdfFiles.length === 0) {
        console.error('No SDF file found in the current directory.');
        process.exit(1);
    } 
    
    else {
        console.error('Multiple SDF files found in the current directory. Please specify the file to use.');
        process.exit(1);
    }
}

// Read and parse SDF file
const sdfContent = fs.readFileSync(filePath, 'utf8');
const parser = new SDFParser();
const jsonResult = parser.parseSDF(sdfContent);

// Write the result to a JSON file
const outputFilePath = path.basename(filePath, path.extname(filePath)) + '.json';
fs.writeFileSync(outputFilePath, JSON.stringify(jsonResult, null, 2));
console.log(`Output saved to ${outputFilePath}`);