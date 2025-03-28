//----------------------------------------------------------------------------------------------
// The purpose of this file is to transform the .json 
// created by the parser into a new JSON format more organized.
//----------------------------------------------------------------------------------------------

// New JSON template
function transformData(signalsData) {
    const transformedData = {
        nodes: [],
        edges: [],
    };

    // First pass: identify clock signals and their connections
    signalsData.cells.forEach(cell => {
        if (cell.type === 'fpga_interconnect') {
            // Check if this is a clock connection
            if (cell.start.toLowerCase().includes('clk') || cell.start.toLowerCase().includes('clock')) {
                // Simplify the clock ID
                const clockId = cell.start.replace(/clk_output_\d+_\d+/i, 'clk'); // Replace 'clk_output_0_0' with 'clk'
            
                // Add clock node if it doesn't exist
                if (!transformedData.nodes.some(n => n.id === clockId)) {
                    transformedData.nodes.push({
                        id: clockId, // Use the simplified clock ID
                        type: 'CLOCK'
                    });
                }
                // Add clock connection as a special edge
                transformedData.edges.push({
                    source: clockId, // Use the simplified clock ID
                    target: cell.end,
                    delay: cell.delay,
                    isClock: true
                });
            } 
            else {
                // Add regular edge
                transformedData.edges.push({
                    source: cell.start,
                    target: cell.end,
                    delay: cell.delays,
                    isClock: false
                });
            }
        } else {
            // Add to nodes
            const node = { 
                id: cell.start, 
                type: cell.type.toLowerCase().includes('dff') ? 'DFF' : 
                      cell.type.toLowerCase().includes('lut') ? 'LUT' : 
                      cell.type.toLowerCase().includes('clk') ? 'CLOCK' : 
                      cell.type
            };
            
            if (cell.delays.length > 0) {
                node.tick = cell.delays;
            }
            transformedData.nodes.push(node);
        }
    });

    return transformedData;
}

export default transformData;