const { downloadFile } = require('../../../utils/DownloadFile')
const { hash256 } = require('../../../utils/Misc')
const Logger = require('../../../utils/Logger')

module.exports = async function create(version) {
	console.log(version)
	const data = await get(`https://api.papermc.io/v2/projects/paper/versions/${version}`)
	if(!data.project_id) throw new Error("Invalid Version");
	const build = data.builds[data.builds.length - 1];
	const buildData = await get(`https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}`);
	const sha256 = buildData.downloads.application.sha256;
	const serverUrl = `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/${buildData.downloads.application.name}`;

	const sdkVersion = require('./cfg').runner.version(version);
	if(!sdkVersion) throw new Error("Invalid Version");
	const cmd = require('./cfg').runner.cmd.replace("{{VERSION}}", version);

	Logger.info(`Downloading Server v${version}b${build}`)
	if(!require('fs').existsSync(`/home/container/server-${version}.jar`)) {
		await downloadFile(serverUrl, `/home/container/server-${version}.jar`)
	} else {
		// get sha256 of existing jar
		const existingHash = await hash256(`/home/container/server-${version}.jar`);
		if(existingHash !== sha256) {
			Logger.info("Server jar already exists, but is outdated. Updating...")
			await downloadFile(serverUrl, `/home/container/server-${version}.jar`)
		}
	}
	return {
		sdk: {
			type: "java",
			version: sdkVersion
		},
		program: {
			eulaMsg: "Do you agree to the Minecraft EULA?",
			eulaFile: "/home/container/eula.txt",
			agreeData: "eula=true"
		},
		launch: cmd
	}
}

const axios = require('axios');
async function get(path) {
	return (await axios.get(path)).data;
}
