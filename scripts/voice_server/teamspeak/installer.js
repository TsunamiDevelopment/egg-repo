const fs = require("fs");
const { downloadFile } = require("../../../utils/DownloadFile");
const Logger = require("../../../utils/Logger");
const bz2 = require('unbzip2-stream');
const tarfs = require("tar-fs");

module.exports = async function create(version) {
	const serverUrl = `https://files.teamspeak-services.com/releases/server/3.13.7/teamspeak3-server_linux_amd64-3.13.7.tar.bz2`;

	await downloadFile(serverUrl, "/home/container/teamspeak.tar.bz2").then(() => {
		const fileSizeInBytes = fs.statSync("/home/container/teamspeak.tar.bz2").size;
		const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
		Logger.info(`Server ZIP downloaded successfully (Size: ${fileSizeInMB} MB)`);
	});

	// Extract the downloaded file
	const tarStream = fs.createReadStream("/home/container/teamspeak.tar.bz2").pipe(bz2());
	tarStream.pipe(tarfs.extract("/home/container"));

	await new Promise((resolve, reject) => {
		tarStream.on("end", () => {
			Logger.info("File extracted successfully.");
			resolve();
		});
		tarStream.on("error", (err) => {
			Logger.error("Error extracting file:", err);
			reject(err);
		});
	});
	
	// move everything from the extracted folder to the current directory
	const extractedDir = "/home/container/teamspeak3-server_linux_amd64/";
	const moveFilesRecursively = (sourceDir, targetDir) => {
		const items = fs.readdirSync(sourceDir, { withFileTypes: true });
		items.forEach((item) => {
			const sourcePath = `${sourceDir}/${item.name}`;
			const targetPath = `${targetDir}/${item.name}`;
			if (item.isDirectory()) {
				if (!fs.existsSync(targetPath)) {
					fs.mkdirSync(targetPath);
				}
				moveFilesRecursively(sourcePath, targetPath);
			} else {
				fs.renameSync(sourcePath, targetPath);
			}
		});
	};

	moveFilesRecursively(extractedDir, "/home/container");
	fs.rmSync(extractedDir, { recursive: true, force: true }); // Remove the directory and its contents

	const cmd = require("./cfg").runner.cmd


	return {
		sdk: {
			type: "system",
			version: null
		},
		program: {},
		launch: cmd
	};
};
