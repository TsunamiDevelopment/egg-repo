const { downloadFile } = require('../../../utils/DownloadFile')
const Logger = require('../../../utils/Logger')
const fs = require('fs');
const { jarDownloadLink, jarVersionInfo } = require('../../../utils/McJarsApp');

module.exports = async function create(version) {
	const serverUrl = await jarDownloadLink("fabric", version);
	const sdkVersion = require('./cfg').runner.version(version);

	if (!sdkVersion) {
		throw new Error("Invalid Version");
	}

	const cmd = require('./cfg').runner.cmd
		.replace("{{VERSION}}", version)
		.replace("{{JDK_VERSION}}", sdkVersion);

	Logger.info(`Downloading Server ${await jarVersionInfo("fabric", version)}`);
	const filePath = `/home/container/server-${version}.jar`;

	if (!fs.existsSync(filePath)) {
		await downloadFile(serverUrl, filePath).then(() => {
			const fileSizeInBytes = fs.statSync(filePath).size;
			const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
			Logger.info(`Server jar downloaded successfully (Size: ${fileSizeInMB} MB)`);
		});
	} else {
		Logger.info("Server jar already exists, but is outdated. Updating...");
		await downloadFile(serverUrl, filePath);
	}

	return {
		sdk: {
			type: "java",
			version: sdkVersion
		},
		program: {
			eulaMsg: "Do you agree to the Minecraft EULA?",
			eulaFile: "eula.txt",
			agreeData: "eula=true"
		},
		launch: cmd
	};
};
