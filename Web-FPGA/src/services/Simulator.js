//-----------------------------------------------------------------------------------------------------
// The purpose of this file is to handle horizontal and vertical movement inside of the simulation box
//-----------------------------------------------------------------------------------------------------

import * as d3 from "d3";

export function enablePanning(simulationCubeRef) {
  const simulationCube = d3.select(simulationCubeRef.current);

  let isPanning = false;
  let startX, startY, scrollLeft, scrollTop;

  simulationCube.on("mousedown", (event) => {
    if (event.button !== 0) return; // Only activate panning for the left mouse button
    event.preventDefault();
    isPanning = true;
    startX = event.clientX;
    startY = event.clientY;
    scrollLeft = simulationCube.node().scrollLeft;
    scrollTop = simulationCube.node().scrollTop;
  });

  d3.select(window).on("mousemove", (event) => {
    if (!isPanning) return;
    event.preventDefault();
    const x = event.clientX;
    const y = event.clientY;
    const walkX = (x - startX) * 1.5; // Adjust multiplier for speed
    const walkY = (y - startY) * 1.5;
    simulationCube.node().scrollLeft = scrollLeft - walkX;
    simulationCube.node().scrollTop = scrollTop - walkY;
  });

  d3.select(window).on("mouseup", () => {
    isPanning = false;
  });

  return () => {
    d3.select(window).on("mousemove", null).on("mouseup", null);
  };
}