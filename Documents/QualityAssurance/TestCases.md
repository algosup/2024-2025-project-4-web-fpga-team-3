# Test Cases for the Project 4: Web FPGA Interface 

## 1. **Introduction**
 This document  lists all the test cases for verifying the functionality, performance, edge cases, and other aspects of the web interface. All test cases have been documented with its unique ID, description, test data, expected results, priority, and steps.

 **The status of test cases will be updated here:** [Google Spreadsheet](https://docs.google.com/spreadsheets/d/1dsK4FeX5mcz6ChqdnvgoaYEvavyTkdlcR-_s7nZ1Gl8/edit?gid=0#gid=0)

 ## 2. **Test Cases**

### 2.1 **Functional Testing**

| **Test Case ID** | **Description**                                                                                           | **Input**                                   | **Expected Output**                   | **Priority** | **Steps**                                                                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FUNC-TC-01   | Verifying the UI interface format is correct     |     Medium     | Check the interface resolution                 | Resize the browser window to 1024x768 or smaller and check if UI displays properly                   | The web page should be displayed at a minimum resolution     |
| FUNC-TC-02   | Verifying the Interface Responsiveness           |   Medium       | Spam-click buttons/features                    | Click all interface elements rapidly and check for lag or glitches                                  | The web page should respond correctly to every click         |
| FUNC-TC-03   | Testing the interface’s accessibility            |   Low       | Try every feature of the web page              | Navigate through the UI using keyboard only and test feature accessibility                          | The web page should display features clearly and understandably |
| FUNC-TC-04   | Testing the interface’s features                 |   High       | Test every feature of the simulation           | Use all simulation features and ensure they work properly                                              | Every feature included in the specs should work              |
| FUNC-TC-05   | Testing if the buttons are working               |  High        | Test every button of the simulation            | Click every button and confirm the expected behavior                                                     | Every button should function as intended                     |
| FUNC-TC-06   | Verifying the cell type detection                |    Critical      | Run the simulation                             | Upload a file with various FPGA cell types and verify recognition                                      | The simulation should correctly detect all cell types        |
| FUNC-TC-07   | Testing if the delay values are correct          |   Critical       | Run the simulation and compare with .sdf       | Compare the delay values in simulation with the source .sdf file                                       | The simulation should output matching delays                 |
| FUNC-TC-08   | FPGA Structure Representation                    |   Critical       | Upload a .sdf file and render simulation       | Verify if structure is visually and logically rendered based on the .sdf                             | The simulation should reflect the correct FPGA structure     |
| FUNC-TC-09   | Check the Signal Propagation                     |   High       | Render the simulation and compare              | Observe signal propagation and verify timing/logic                                                     | The simulation should show correct signal behavior           |
| FUNC-TC-10   | Clock Behavior                                   | High         | Render the simulation and compare              | Verify if clock signals trigger components correctly                                                    | The simulation should handle clock behavior correctly        |
| FUNC-TC-11   | Reset Behavior                                   |  High        | Render the simulation and compare              | Trigger a reset and observe if states reset correctly                                                   | The simulation should reflect correct reset logic            |
| FUNC-TC-12   | Multiple Inputs to LUT                           |   Medium       | Render the simulation and compare              | Check LUT behavior when multiple inputs are present                                                     | The simulation should handle LUT inputs correctly            |
| FUNC-TC-13   | Pipeline Simulation                              |   High       | Render the simulation and compare              | Analyze how signals move through sequential FPGA elements                                               | Signals should propagate correctly in pipeline               |

---

### 2.2 **Performance Testing**

| **Test Case ID** | **Description**                                                                     | **Input**                                   | **Expected Output**                                | **Priority** | **Steps**                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| PERF-TC-01   | Testing the web interface loading speed          |  Critical        | Render the simulation and test                 | Measure page load time                                                                                 | The web page should load in a reasonable time frame          |
| PERF-TC-02   | Testing the interface smoothness                 |    Low      | Render the simulation and test                 | Observe animations and interactions for lag                                                            | The web page should render without lag or stuttering         |
| PERF-TC-03   | Testing simulation vs .sdf synchronization       |      Critical    | Render the simulation and compare with .sdf    | Compare simulation behavior to delay values in the .sdf                                                 | The simulation should match the expected behavior            |

---

### 2.3 **Algorithm Testing**

| ID           | Description                                      | Priority | Input                                        | Procedure                                                                 | Expected Output                                              |
|--------------|--------------------------------------------------|----------|-----------------------------------------------|---------------------------------------------------------------------------|--------------------------------------------------------------|
| ALGO-TC-01   | Testing if the parsing works correctly           |   Critical       | Uploading a .sdf file on the Web interface     | Upload a valid .sdf file on the web interface and check if the parser outputs a valid JSON format | The parser should generate a valid .json file                |
| ALGO-TC-02   | Testing if the transformer works correctly       |     Critical     | Uploading a .sdf file on the Web interface     | Upload a valid .sdf file on the web interface and check if the transformer converts it properly     | The transformer should generate a formatted JSON file        |

---

### 2.4 **EDGE Testing**

| **Test Case ID** | **Description**                                      | **Input**                                   | **Expected Output**   | **Priority** | **Steps**                                                                                                                 |
| ---------------- | ---------------------------------------------------- | ------------------------------------------- | --------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------- |
| EDGE-TC-01   | Empty SDF File                                   |   Medium       | Entering an empty .sdf file                    | Upload an empty file and check system response                                                          | The web page should return an appropriate error message      |
| EDGE-TC-02   | Malformed SDF file                               |  Medium        | Entering a malformed .sdf file                 | Upload a corrupted file and check the system's error handling                                           | The web page should return a “file not supported” error      |
| EDGE-TC-03   | Huge SDF file                                    |   High       | Entering a huge .sdf file                      | Upload a large file and monitor for crashes                                                             | The web page should process the file without crashing        |
| EDGE-TC-04   | Unsupported FPGA architecture                    |    Medium      | Entering an unsupported .sdf file              | Upload a file with unsupported cells and observe handling                                               | The web page should return a “file not supported” error      |

---

## 3. **Conclusion**

This document provides a comprehensive list of test cases to ensure the functionality, performance, and reliability of the project. The status of test cases will be updated in the **Google Spreadsheet** linked above.
