<table align="center" width="100%" border="0" cellspacing="0" cellpadding="20" bgcolor="#1F4D82" style="margin-bottom:20px;">
  <tr>
    <td align="center">
      <font color="#ffffff">
        <h1 style="margin:0;">Project Charter <br> Web Interface for FPGA Simulator</h1>
        <p style="margin:0; font-size:1.2em;">
      </font>
    </td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="20" style="border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
  <tr bgcolor="#E8F3FC">
    <td>
      <h2 style="margin-top:0;">1. Project Purpose</h2>
      <p style="margin-top:0;">
        This project aims to develop an interactive <strong>web interface</strong> that visualizes 
        how electrical signals propagate inside an FPGA. The tool is intended for educational purposes, 
        allowing teachers to upload Verilog-based applications and testbenches, and enabling students to 
        explore the time-based signal flow across a 2D FPGA floorplan. By merging both the netlist layout 
        (post-synthesis and place-and-route) and the timing data from simulations, the project will 
        provide a clear, instructive view of hardware design concepts in action.
      </p>
    </td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="20" style="border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
  <tr bgcolor="#F6FFED">
    <td>
      <h2 style="margin-top:0;">2. Project Objectives</h2>
      <ul style="margin-top:0;">
        <li><strong>Educational Focus:</strong> Demonstrate real-time or stepped propagation of signals in a 2D FPGA layout, making complex hardware concepts more approachable for students.</li>
        <li><strong>Backend for Teachers:</strong> Provide a simple interface to upload Verilog applications and testbenches, automatically generating required data (netlist, SDF) for the visualization.</li>
        <li><strong>User-Friendly Controls:</strong> Enable students to play, pause, resume, and step through signal propagation at adjustable speeds.</li>
        <li><strong>Performance and Scalability:</strong> Handle potentially large netlists while keeping user interactions responsive, leveraging open-source FPGA tools where possible.</li>
        <li><strong>Documentation &amp; Examples:</strong> Deliver how-to guides, at least two preloaded example applications (Flip-Flop, LUT4), and clear instructions for adding more.</li>
      </ul>
    </td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="20" style="border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
  <tr bgcolor="#FFF7E6">
    <td>
      <h2 style="margin-top:0;">3. Scope</h2>
      <p><strong>In-Scope:</strong></p>
      <ul>
        <li>Implementation of a 2D visualization showing BELs, routing, and timing data within an FPGA.</li>
        <li>Integration with FPGA netlist (Verilog) and SDF files, leveraging <em>Modelsim</em> or similar for timing simulation.</li>
        <li>Basic “teacher upload” backend to import new Verilog/testbench files and produce needed layout/timing data.</li>
        <li>Frontend controls: play, pause, resume, step, variable speed playback.</li>
        <li>Delivery of documentation: how to run the software, how to add new examples, and user manuals for teachers and students.</li>
      </ul>
      <p><strong>Out-of-Scope:</strong></p>
      <ul>
        <li>Advanced multi-user or collaboration features beyond a single user interface.</li>
        <li>Extensive verification or advanced FPGA design flows beyond what’s needed for demonstration.</li>
        <li>Complex user authentication or role-based access controls beyond “teacher” and “student.”</li>
        <li>Support for FPGAs or tools outside the basic environment (e.g., advanced proprietary device families).</li>
      </ul>
    </td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="20" style="border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
  <tr bgcolor="#E6F7FF">
    <td>
      <h2 style="margin-top:0;">4. Deliverables</h2>
      <ul style="margin-top:0;">
        <li><strong>Functional Specification</strong> – Detailed description of features and user flows. <em>(Due: 13/03)</em></li>
        <li><strong>Technical Specification</strong> – Architecture overview, tech stack decisions, data structures. <em>(Due: 25/03)</em></li>
        <li><strong>Test Plan</strong> – Steps for verifying each feature, performance tests. <em>(Due: 25/03)</em></li>
        <li><strong>Source Code</strong> – Web app (frontend + backend), plus automation/scripts. <em>(Due: 01/04)</em></li>
        <li><strong>Documentation/Manuals</strong> – How to set up, run, add new examples, plus user guides for teacher/student usage.</li>
      </ul>
    </td>
  </tr>
</table>

<table width="100%" border="0" cellspacing="0" cellpadding="20" style="border:1px solid #ccc; border-collapse:collapse; margin-bottom:20px;">
  <tr bgcolor="#FFF7E6">
    <td>
      <h2 style="margin-top:0;">6. Key Stakeholders</h2>
      <p style="margin-top:0;">
        The table below shows each core team member's picture, full name, role, icon links, 
        and main responsibilities.
      </p>
      <table width="100%" border="1" cellspacing="0" cellpadding="8" style="border-collapse:collapse; background-color:#ffffff;">
        <tr style="background-color:#f9f9f9;">
          <th>Picture</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Links</th>
          <th>Responsibilities</th>
        </tr>
        <tr>
          <td align="center">
            <img src="https://ca.slack-edge.com/T019N8PRR7W-U04JK8487BK-b37025b07600-512" width="100" alt="Program Manager Picture">
          </td>
          <td><strong>Vivien Bistrel TSANGUE CHOUNGOU</strong></td>
          <td>Program Manager</td>
          <td align="center">
            <a href="https://www.linkedin.com/in/bistrel-tsangue-603635261/" target="_blank" style="margin-right:5px;">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" alt="LinkedIn">
            </a>
            <a href="https://github.com/username4" target="_blank">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub">
            </a>
          </td>
          <td>
            Coordinates strategic alignment, verifies project scope matches sponsor needs, 
            and ensures the project supports overall program objectives.
          </td>
        </tr>
        <tr>
          <td align="center">
            <img src="https://ca.slack-edge.com/T019N8PRR7W-U05TC0NGYD7-c0b4f1e2424f-512" width="100" alt="Project Manager Picture">
          </td>
          <td><strong>RIFF Michel</strong></td>
          <td>Project Manager</td>
          <td align="center">
            <a href="https://www.linkedin.com/in/michel-riff-693007293/" target="_blank" style="margin-right:5px;">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" alt="LinkedIn">
            </a>
            <a href="https://github.com/MichelRiff" target="_blank">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub">
            </a>
          </td>
          <td>
            Oversees scheduling, resources, risk management, and overall progress tracking 
            to ensure on-time and on-budget delivery.
          </td>
        </tr>
        <tr>
          <td align="center">
            <img src="https://ca.slack-edge.com/T019N8PRR7W-U043BHQ4U82-g00cd520ab1f-512" width="100" alt="Tech Lead Picture">
          </td>
          <td><strong>Alexis LASSELIN</strong></td>
          <td>Tech Lead</td>
          <td align="center">
            <a href="https://www.linkedin.com/in/alexis-lasselin-318649251/" target="_blank" style="margin-right:5px;">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" alt="LinkedIn">
            </a>
            <a href="https://github.com/AlexisLasselin" target="_blank">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub">
            </a>
          </td>
          <td>
            Guides architectural decisions, ensures code quality, manages integration 
            with FPGA tools, and resolves technical roadblocks.
          </td>
        </tr>
        <tr>
          <td align="center">
            <img src="https://ca.slack-edge.com/T019N8PRR7W-U05SJQXTQH5-b73ed782c315-512" width="100" alt="Software Engineer Picture">
          </td>
          <td><strong>Camille GAYAT</strong></td>
          <td>Software Engineer</td>
          <td align="center">
            <a href="https://www.linkedin.com/in/camille-g-a89114293/" target="_blank" style="margin-right:5px;">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" alt="LinkedIn">
            </a>
            <a href="https://github.com/CamilleGayat" target="_blank">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub">
            </a>
          </td>
          <td>
            Implements core functionalities (front-end visualization, back-end data handling), 
            and contributes to design improvements.
          </td>
        </tr>
        <tr>
          <td align="center">
            <img src="https://ca.slack-edge.com/T019N8PRR7W-U07DF2STYTY-778a0d8c2e69-512" width="100" alt="Quality Assurance Picture">
          </td>
          <td><strong>Julian REINE</strong></td>
          <td>Quality Assurance</td>
          <td align="center">
            <a href="https://www.linkedin.com/in/julian-reine-b2952632a/" target="_blank" style="margin-right:5px;">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" alt="LinkedIn">
            </a>
            <a href="https://github.com/JulianREINE" target="_blank">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub">
            </a>
          </td>
          <td>
            Develops test plans, identifies defects, and ensures performance 
            and reliability across various usage scenarios.
          </td>
        </tr>
        <tr>
          <td align="center">
            <img src="https://ca.slack-edge.com/T019N8PRR7W-U02F4Q1PXQT-c2f55b45d78d-512" width="100" alt="Technical Writer Picture">
          </td>
          <td><strong>Paul NOWAK</strong></td>
          <td>Technical Writer</td>
          <td align="center">
            <a href="https://www.linkedin.com/in/paul-nowak-0757a61a7/" target="_blank" style="margin-right:5px;">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="24" alt="LinkedIn">
            </a>
            <a href="https://github.com/PaulNowak36" target="_blank">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="24" alt="GitHub">
            </a>
          </td>
          <td>
            Maintains project documentation and how-to guides 
            for both teachers (backend) and students (frontend).
          </td>
        </tr>
      </table>
      <p style="margin-top:20px;">
        Additional stakeholders (e.g., instructors, students) may also provide feedback 
        on usability and ensure the project meets educational objectives.
      </p>
    </td>
    </tr>
</table>