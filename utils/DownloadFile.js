const fs = require("fs");
const axios = require("axios");
const { once } = require("events");

async function downloadFile(fileUrl, outputLocationPath) {
  const writer = fs.createWriteStream(outputLocationPath);

  try {
    const response = await axios.get(fileUrl, { responseType: "stream" });

    response.data.pipe(writer);

    // Wait for the stream to finish
    await once(writer, "finish");

    return true; // Indicate success
  } catch (error) {
    writer.close(); // Close the writer if an error occurs
    throw error;    // Rethrow the error to the caller
  }
}

module.exports = { downloadFile }