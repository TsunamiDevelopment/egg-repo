const { downloadFile } = require('../../../utils/DownloadFile')
const Logger = require('../../../utils/Logger')
const fs = require('fs');

module.exports = async function create(version) {
	const serverUrl = 'https://www.minecraft.net/bedrockdedicatedserver/bin-linux/bedrock-server-1.21.71.01.zip';

	const cmd = require('./cfg').runner.cmd

	Logger.info(`Downloading Server v1.21.71.01`);
	const filePath = `/home/container/server-1.21.71.01.zip`;

	if (!fs.existsSync(filePath)) {
		await downloadFile(serverUrl, filePath).then(() => {
			const fileSizeInBytes = fs.statSync(filePath).size;
			const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
			Logger.info(`Server ZIP downloaded successfully (Size: ${fileSizeInMB} MB)`);
		});
	} else {
		Logger.info("Server ZIP already exists, but is outdated. Updating...");
		await downloadFile(serverUrl, filePath);
	}

    // Unzip the downloaded file
    fs.createReadStream(filePath)
        .pipe(require('unzip').Extract({ path: '/home/container/' }))
        .on('close', () => {
            Logger.info('Server ZIP extracted successfully');
        })
        .on('error', (err) => {
            Logger.error(`Error extracting server ZIP: ${err}`);
        });

	return {
		sdk: {
			type: "system",
			version: null
		},
		program: {
			eulaMsg: "Do you agree to the Minecraft EULA?",
			eulaFile: "eula.txt",
			agreeData: "eula=true"
		},
		launch: cmd
	};
};
