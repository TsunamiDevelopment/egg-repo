const fs = require("fs");
const axios = require("axios");

async function downloadFile(fileUrl, outputLocationPath) {
  return new Promise(async (resolve, reject) => {
    const writer = fs.createWriteStream(outputLocationPath);

    try {
      const response = await axios.get(fileUrl, { responseType: "stream" });
      response.data.pipe(writer);

      // Listen for the 'finish' event and resolve the promise
      writer.on("finish", () => resolve(true));

      // Handle stream errors
      writer.on("error", (error) => {
        writer.close();
        reject(error);
      });
    } catch (error) {
      writer.close();
      reject(error);
    }
  });
}

module.exports = { downloadFile };
