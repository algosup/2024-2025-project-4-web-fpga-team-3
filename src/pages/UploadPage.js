//----------------------------------------------------------------------------------------------
// The purpose of this file is to handle the user's file upload and process it 
// using the SDFParser and Transform services.
//----------------------------------------------------------------------------------------------

import SDFParser from '../services/Parser.js';
import transformData from '../services/Transform.js';

document.getElementById('uploadButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = async (event) => {
    const sdfContent = event.target.result;

    try {
      // Parse SDF into JSON
      const parser = new SDFParser();
      const parsedJson = parser.parseSDF(sdfContent);

      // Transform JSON into organized format
      const transformedJson = transformData(parsedJson);

      // Display final JSON result
      document.getElementById('result').textContent = JSON.stringify(transformedJson, null, 2);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error parsing or transforming the file.');
    }
  };
  reader.readAsText(file);
});
