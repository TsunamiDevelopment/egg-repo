const fs = require("fs");
const { downloadFile } = require("../../../utils/DownloadFile");
const Logger = require("../../../utils/Logger");

module.exports = async function create(version) {
	const serverUrl = `https://github.com/lavalink-devs/Lavalink/releases/download/4.0.8/Lavalink.jar`;

	await downloadFile(serverUrl, "/home/container/Lavalink.jar").then(() => {
		const fileSizeInBytes = fs.statSync("/home/container/Lavalink.jar").size;
		const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
		Logger.info(`Server jar downloaded successfully (Size: ${fileSizeInMB} MB)`);
	});

	const cmd = require("./cfg").runner.cmd
		.replace("{{VERSION}}", version)
		.replace("{{JDK_VERSION}}", require("./cfg").runner.version(version));


	return {
		sdk: {
			type: "java",
			version: require("./cfg").runner.version(version)
		},
		program: {},
		launch: cmd
	};
};
