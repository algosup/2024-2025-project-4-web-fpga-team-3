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

    // Process each cell in the signals data
    signalsData.cells.forEach(cell => {
        if (cell.type === 'fpga_interconnect') {
            // Add to edges
            transformedData.edges.push({
                source: cell.start,
                target: cell.end,
                delay: cell.delays
            });
        } else {
            // Add to nodes
            const node = { id: cell.start, type: cell.type };
            if (cell.delays.length > 0) {
                node.tick = cell.delays;
            }
            transformedData.nodes.push(node);
        }
    });
    return transformedData;
}
export default transformData;