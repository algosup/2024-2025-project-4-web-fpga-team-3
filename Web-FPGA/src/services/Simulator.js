//-----------------------------------------------------------------------------------------------------
// The purpose of this file is to handle horizontal and vertical movement inside of the simulation box
//-----------------------------------------------------------------------------------------------------

import * as d3 from "d3";

export function enablePanning(simulationCubeRef, svgRef) {
  const simulationCube = d3.select(simulationCubeRef.current);
  const content = simulationCube.select(".columns-container"); // Target the content inside the simulation-cube
  const svg = d3.select(svgRef.current); // Target the SVG element for wires

  let isPanning = false;
  let startX, startY;
  let currentX = 0, currentY = 0;

  simulationCube.on("mousedown", (event) => {
    if (event.button !== 0) return; // Only activate panning for the left mouse button
    event.preventDefault();
    isPanning = true;
    startX = event.clientX;
    startY = event.clientY;
  });

  d3.select(window).on("mousemove", (event) => {
    if (!isPanning) return;
    event.preventDefault();
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;

    // Update the current translation
    currentX += deltaX;
    currentY += deltaY;

    // Apply the translation using CSS transform to both content and SVG
    content.style("transform", `translate(${currentX}px, ${currentY}px)`);
    svg.style("transform", `translate(${currentX}px, ${currentY}px)`);

    // Update the starting point for the next movement
    startX = event.clientX;
    startY = event.clientY;
  });

  d3.select(window).on("mouseup", () => {
    isPanning = false;
  });

  return () => {
    d3.select(window).on("mousemove", null).on("mouseup", null);
  };
}