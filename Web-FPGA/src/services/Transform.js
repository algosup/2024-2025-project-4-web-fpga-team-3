//----------------------------------------------------------------------------------------------
// The purpose of this file is to transform the .json 
// created by the parser into a new JSON format more organized.
//----------------------------------------------------------------------------------------------

// New JSON template
function transformData(signalsData) {
    const transformedData = {
        nodes: [],
        edges: []
    };

    // First pass: identify clock signals and their connections
    signalsData.cells.forEach(cell => {
        if (cell.type === 'fpga_interconnect') {
            // Check if this is a clock connection
            if (cell.start.toLowerCase().includes('clk') || cell.start.toLowerCase().includes('clock')) {
                // Add clock node if it doesn't exist
                if (!transformedData.nodes.some(n => n.id === cell.start)) {
                    transformedData.nodes.push({
                        id: cell.start,
                        type: 'CLOCK'
                    });
                }
                // Add clock connection as a special edge
                transformedData.edges.push({
                    source: cell.start,
                    target: cell.end,
                    delay: cell.delays,
                    isClock: true
                });
            } else {
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