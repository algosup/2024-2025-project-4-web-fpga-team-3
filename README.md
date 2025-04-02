# 2024 / 2025 - project 4 - web fpga - team 3

## Project Overview

This project aims to create a web-based FPGA development environment that allows users to simulate FPGA applications directly from their web browsers. The goal is to provide an accessible and user-friendly platform for both beginners and experienced developers in the field of FPGA programming.

## How to run the project

> [!NOTE]
> This project is made in React.js and uses the Vite build tool. It is designed to be run in a web browser, and it is recommended to use the latest version of Google Chrome or Firefox for the best experience.

To run the project, follow these steps:

1. Clone the repository by downloading the ZIP file or using Git to clone it to your local machine.
2. Open your file explorer and navigate to the project directory.
3. Based on your operating system, follow the appropriate instructions below:

   - **Windows**:

   1. Click on the `WindowsLauncher.bat` file to start the project and wait until a browser window opens.
   2. If the browser does not open automatically, open your web browser and navigate to `http://localhost:5173/`.

   - **Linux**:

   1. Open a terminal and navigate to the project directory.
   2. Run the command `chmod +x LinuxLauncher.sh` to make the script executable.
   3. Run the command `./LinuxLauncher.sh` to start the project and wait until a browser window opens.
   4. If the browser does not open automatically, open your web browser and navigate to `http://localhost:5173/`.

   - **Mac**:

   1. Open the `MacLauncher.command` file to start the project and wait until a browser window opens.
   2. If the browser does not open automatically, open your web browser and navigate to `http://localhost:5173/`.

4. Once the project is running, you can start using the web-based FPGA development environment.
   To do so, you'll need to add a `.sdf` file in the upload section of the web app.
   Once added, press the "Upload" button to upload the file.
5. After the upload is complete, you can see the FPGA simulation in the "Simulation" section of the web app.
   You can also see the logs in the "Logs" section of the web app.

> [!WARNING]
> The project is still in development, and some features may not work as expected, such as the log section.

## Project Structure

The project is structured as follows:

- The `Web-FPGA` directory contains the main source code for the web application, mainly located in [App.jsx](Web-FPGA/src/App.jsx) and in the `service` folder.
- The `Documents` directory contains the documentation for the project, excluding this README file.
- The launcher files are located in the root directory of the project.
- The `README.md` file contains the project description and instructions for running the project.
- The `CODE_OF_CONDUCT.md` file contains the code of conduct for the project.

## Acknowledgements

We would like to thank our professor, [Fadi Hania](https://www.linkedin.com/in/fadihania/) for his class and support throughout the project.
We would also like to thank [Florent Manni](https://www.linkedin.com/in/florent-manni-182547211/) and all the [CNES](https://www.cnes.fr/en) team for their support and trust in us.
Finally, we would like to thank all the students who participated in this project and contributed to its success.

Thanks to:

- Michel, our Project Manager
- Vivien, our Program Manager
- Alexis, our Technical Lead
- Camille, our Software Engineer
- Julian, our QA Engineer
- Paul, our Technical Writer

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
