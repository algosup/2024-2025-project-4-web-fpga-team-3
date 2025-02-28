# Technical Specifications - Team 3

## Table of Contents

<details>
<summary>Click to expand</summary>

- [Technical Specifications - Team 3](#technical-specifications---team-3)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
    - [Objectives](#objectives)
  - [Scope](#scope)
  - [Glossary](#glossary)

</details>

## Introduction

This project is a commission from the [CNES](https://cnes.fr/) (Centre National d'Études Spatiales), the French space agency.
The purpose of this project is to develop a web-based interface to visualize FPGA signal propagation. The target users include:

- **Teachers** who upload their FPGA designs and use the tool to teach their students.
- **Students** who interact with the simulator to observe and analyze FPGA behavior.

The system doesnt't have any mandatory framework or library to use, but the team is free to use any of them. The only constraint is that the system must be web-based. It's the reason why the team chose to use the [React](https://reactjs.org/) library for the front-end and the [D3.js](https://d3js.org/) library for the visualization part.

### Objectives

The main objective of this project is to provide an interactive 2D visualization of FPGA structures and signal routing. The system should be able to simulate signal propagation in real-time with time-based animations, allowing users to see how signals travel through an FPGA design. Teachers should have the capability to upload Verilog applications and testbenches, which students can then use to run and analyze simulations. The interface should be intuitive, engaging, and informative, making it easier for students to grasp the fundamentals of FPGA design and behavior.

## Scope

The project is divided into two main parts:

1. **Front-end**: The web-based interface that users interact with. This includes the visualization of the FPGA structure and signal propagation, as well as the user interface for uploading and running simulations.
2. **Back-end**: The server-side application that handles file uploads, simulation execution, and communication with the front-end.

| Item          | In Scope                                                                                                                                                                                                           | Out of Scope                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| **Front-end** | - Visualization of FPGA structures and signal propagation. <br> - User interface for uploading Verilog applications and testbenches. <br> - Real-time simulation of signal propagation with time-based animations. | - Advanced features like debugging, and waveform analysis. <br> - Support for complex FPGA architectures and designs. |
| **Back-end**  | - Handling Verilog file uploads and processing. <br> - Running FPGA simulations and sending results to the front-end. <br> - Providing a REST API for communication with the front-end.                            | - Full-scale FPGA synthesis or hardware implementation. <br> - Integration with proprietary FPGA vendor tools.        |

## Glossary

| Term | Definition                                                                                                                        | Source                                                                                        |
| ---- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| FPGA | Field-Programmable Gate Array, an integrated circuit with basic elements and preconfigured electrical signal routes between them. | [Wikipedia](https://en.wikipedia.org/wiki/Field-programmable_gate_array)                      |
| BEL  | The hardware electrical ressources available inside the FPGA like fliflop, Look-Up-Table (LUT), Block RAM....                     | [Xilinx](https://www.rapidwright.io/docs/Xilinx_Architecture.html#bel-basic-element-of-logic) |
