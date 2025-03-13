<table align="center" style="width:100%; border:0; cellspacing:0; cellpadding:30; background-color:#1F4D82; margin-bottom:20px;">
  <tr>
    <td align="center">
      <font color="#ffffff">
        <h1 style="margin:0;">Management Artifacts – Web FPGA Simulator</h1>
        <p style="font-size:1.2em;">
          This document centralizes all key management artifacts for the "Web Interface for FPGA Simulator" project.
        </p>
      </font>
    </td>
  </tr>
</table>

<div style="background-color: #F0F0F0; border: 1px solid #ccc; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
  <h2 style="margin-top:0;">Table of Contents</h2>
  <ul style="list-style-type: disc; padding-left: 40px; margin: 0;">
    <li><a href="#raci-matrix">RACI Matrix</a></li>
    <li><a href="#risks--mitigations">Risks &amp; Mitigations</a></li>
    <li><a href="#key-performance-indicators">Key Performance Indicators</a></li>
    <li><a href="#assumptions">Assumptions</a></li>
    <li><a href="#post-mortem">Post Mortem</a></li>
    <li><a href="#weekly-reports">Weekly Reports</a></li>
  </ul>
</div>

<table style="width=100%; background-color:#E6F7FF; border:1px solid #ccc; margin-bottom:20px; border-collapse:collapse;">
  <tr>
    <td style="padding:20px;">
      <h2 id="raci-matrix" style="margin-top:0;">📌 RACI Matrix</h2>
      <p>
        The table below outlines the key responsibilities for each major deliverable, 
        based on the roles in the project. 
      </p>
      <table style="border:1; width:100%; cellspacing:0; cellpadding:8; border-collapse:collapse;">
        <tr>
          <th>Deliverable</th>
          <th>Project Manager</th>
          <th>Program Manager</th>
          <th>Technical Leader</th>
          <th>Software Engineer</th>
          <th>Quality Assurance</th>
          <th>Technical Writer</th>
          <th>Client</th>
        </tr>
        <tr>
          <th>Call for Tender</th>
          <td>I</td>
          <td>I</td>
          <td>I</td>
          <td>I</td>
          <td>I</td>
          <td>I</td>
          <td>R</td>
        </tr>
        <tr>
          <th>Project Charter</th>
          <td>R</td>
          <td>C</td>
          <td>C</td>
          <td>C</td>
          <td>C</td>
          <td>C</td>
          <td>I</td>
        </tr>
        <tr>
          <th>Functional Specification</th>
          <td>C</td>
          <td>R</td>
          <td>A</td>
          <td>C</td>
          <td>I</td>
          <td>I</td>
          <td>C</td>
        </tr>
        <tr>
          <th>Technical Specification</th>
          <td>C</td>
          <td>C</td>
          <td>R</td>
          <td>C</td>
          <td>C</td>
          <td>/</td>
          <td>C</td>
        </tr>
        <tr>
          <th>Coding Process</th>
          <td>I</td>
          <td>I</td>
          <td>A</td>
          <td>R</td>
          <td>C</td>
          <td>/</td>
          <td>/</td>
        </tr>
        <tr>
          <th>Testing Planification</th>
          <td>C</td>
          <td>/</td>
          <td>C</td>
          <td>C</td>
          <td>R</td>
          <td>/</td>
          <td>/</td>
        </tr>
        <tr>
          <th>Usage Instructions</th>
          <td>A</td>
          <td>C</td>
          <td>C</td>
          <td>C</td>
          <td>/</td>
          <td>R</td>
          <td>I</td>
        </tr>
      </table>
      <p><strong>Legend:</strong></p>
      <table style="border:1; cellspacing:0; cellpadding:8; border-collapse:collapse;">
        <tr>
          <th>Letter</th>
          <th>Full Name</th>
          <th>Description</th>
        </tr>
        <tr>
          <td>R</td>
          <td>Responsible</td>
          <td>Work to complete the task.</td>
        </tr>
        <tr>
          <td>A</td>
          <td>Accountable</td>
          <td>must sign off (approve) work that responsible provides. The one to praised or blame.</td>
        </tr>
        <tr>
          <td>C</td>
          <td>Consulted</td>
          <td>Those whose opinions are sought, typically subject-matter experts, and with whom there is two-way communication.</td>
        </tr>
        <tr>
          <td>I</td>
          <td>Informed</td>
          <td>Those who are kept up-to-date on progress, often only on completion of the task or deliverable, and with whom there is just one-way communication</td>
        </tr>
        <tr>
          <td>/</td>
          <td> - </td>
          <td>Not involved</td>
        </tr>
      </table>
    </td>
  </tr>
</table>


<table style="width=100%; background-color:#F6FFED; border:1px solid #ccc; margin-bottom:20px; border-collapse:collapse;">
  <tr>
    <td style="padding:20px;">
      <h2 id="risks--mitigations" style="margin-top:0;">⚠ Risks &amp; Mitigations</h2>
      <p>
        Below are the potential risks identified for the "Web FPGA Simulator" project, with suggested mitigations. 
        New risks can be appended as they surface.
      </p>
      <table style="border:1; width:100%; cellspacing:0; cellpadding:8; border-collapse:collapse;">
        <tr>
          <th>Risk</th>
          <th>Consequence</th>
          <th>Impact</th>
          <th>Mitigation</th>
        </tr>
        <tr>
          <td>A team member is absent</td>
          <td>Project progress may slow significantly</td>
          <td>High</td>
          <td>Cross-train team members; reassign tasks as needed</td>
        </tr>
        <tr>
          <td>Complex data parsing (netlist &amp; SDF)</td>
          <td>Delays or errors in visualizing FPGA layout and timing</td>
          <td>Medium</td>
          <td>Research existing libraries (e.g., <em>python-sdf-timing</em>), run integration tests early</td>
        </tr>
        <tr>
          <td>Performance constraints with large netlists</td>
          <td>Slow or unresponsive user interface</td>
          <td>High</td>
          <td>Use efficient data structures; implement incremental or lazy loading in the UI</td>
        </tr>
        <tr>
          <td>Scope creep or mid-project requirement changes</td>
          <td>Extended timeline or budget overrun</td>
          <td>Medium</td>
          <td>Maintain a clearly defined backlog; schedule periodic scope reviews with stakeholders</td>
        </tr>
        <tr>
          <td>Back-end integration issues with FPGA simulator</td>
          <td>Inaccurate or incomplete signal data, undermining the UI display</td>
          <td>High</td>
          <td>Run consistent integration tests; confirm verilog/ SDF compatibility with Modelsim</td>
        </tr>
        <tr>
          <td>Insufficient/unclear teacher-provided testbenches</td>
          <td>Difficulty demonstrating time propagation in complex circuits</td>
          <td>Medium</td>
          <td>Define guidelines for testbench submission; provide sample testbenches in the documentation</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<table style="width=100%; background-color:#E8F3FC; border:1px solid #ccc; margin-bottom:20px; border-collapse:collapse;">
  <tr>
    <td style="padding:20px;">
      <h2 id="key-performance-indicators" style="margin-top:0;">📊 Key Performance Indicators</h2>
      <p>
        KPIs help measure our progress and project health. Our primary KPIs are tracked in a 
        <a href="" target="_blank">
          shared spreadsheet
        </a>(<em>coming soon</em>).
      </p>
      <p>
        Below is a brief overview. More details can be found in the spreadsheet.
      </p>
      <ul>
        <li><strong>Documents:</strong>
          <ul>
            <li>Project Charter Completion 60%</li>
            <li>Functional Specification Completion 15%</li>
            <li>Technical Specification Completion 70%</li>
            <li>Test Plan Completion 0%</li>
            <li>User Manual Completion 0%</li>
          </ul>
        </li>
        <li><strong>Development:</strong>
          <ul>
            <li>(<em>Additional content will be provided as the project progresses.</em>)</li>
          </ul>
        </li>
      </ul>
    </td>
  </tr>
</table>

<table style="width=100%; background-color:#F6F8FA; border:1px solid #ccc; margin-bottom:20px; border-collapse:collapse;">
  <tr>
    <td style="padding:20px;">
      <h2 id="post-mortem" style="margin-top:0;">📝 Post Mortem</h2>
      <p>
        After key milestones (or at the end of the project), each team member reflects on what they learned,
        challenges encountered, and improvement areas. 
        (<em>Will be updated at the end of the project</em>)
      </p>
      <table style="border-collapse:collapse; border:1; width:100%; cellspacing:0; cellpadding:8;">
        <tr>
          <th>Person</th>
          <th>What You Learned</th>
          <th>Problem Encountered</th>
          <th>How You Handled It</th>
          <th>What to Improve</th>
          <th>What You Liked</th>
          <th>What You Didn't Like</th>
          <th>What You Are Proud Of</th>
        </tr>
        <tr>
          <th>Vivien TSANGUE CHOUNGOU</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Michel RIFF</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Julian REINE</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Camille GAYAT</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Alexis LASSELIN</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th>Paul NOWAK</th>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </td>
  </tr>
</table>

<table style="width=100%; background-color:#FCF0F3; border:1px solid #ccc; margin-bottom:20px; border-collapse:collapse;">
  <tr>
    <td style="padding:20px;">
      <h2 id="weekly-reports" style="margin-top:0;">🗓️ Weekly Reports</h2>
      <p>
        Each week's progress is summarized in dedicated documents. 
        You can view them all <a href="WeeklyReports">here</a> or jump directly:
      </p>
      <ul>
        <li><a href="WeeklyReports/WeeklyReport1.md">Week 1</a></li>
        <li><a href="WeeklyReports/WeeklyReport2.md">Week 2</a></li>
        <li><a href="WeeklyReports/WeeklyReport3.md">Week 3</a> (coming soon)</li>
        <li><a href="WeeklyReports/WeeklyReport4.md">Week 4</a> (coming soon)</li>
        <li><a href="WeeklyReports/WeeklyReport5.md">Week 5</a> (coming soon)</li>
        <li><a href="WeeklyReports/WeeklyReport6.md">Week 6</a> (coming soon)</li>
      </ul>
      <p>
        <strong>Note:</strong> Each weekly report typically includes a brief overview of 
        tasks completed, challenges, and plans for the following week.
      </p>
    </td>
  </tr>
</table>
