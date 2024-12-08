const fs = require("fs");
const axios = require("axios");
const { once } = require("events");

async function downloadFile(fileUrl, outputLocationPath) {
	const writer = fs.createWriteStream(outputLocationPath);
	try {
    	const response = await axios.get(fileUrl, { responseType: "stream" });
    	response.data.pipe(writer);
    	await once(writer, "finish");
    	return true;
  	} catch (error) {
    	writer.close();
	    throw error;
	}
}
module.exports = { downloadFile }