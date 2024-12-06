const { downloadFile } = require('/repo/utils/DownloadFile.js')
const { installSdkVersion } = require('/repo/utils/sdks/java.js')
const { exec } = require('child_process');
const { launchApp } = require('/repo/utils/Misc.js')

module.exports = async function create(version) {
	console.log(version)
	const data = await get(`https://api.papermc.io/v2/projects/paper/versions/${version}`)
	if(!data.project_id) throw new Error("Invalid Version");
	const build = data.builds[0];
	const serverUrl = `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`;

	const sdkVersion = require('./cfg').runner.version(version);
	if(!sdkVersion) throw new Error("Invalid Version");
	const cmd = require('./cfg').runner.cmd.replace("{{VERSION}}", version);

	console.log("Installing Java SDK")
	await installSdkVersion(sdkVersion).catch(e => { throw new Error(e) });
	console.log("Creating Server Directory")
	await exec("mkdir -p /home/container/")
	console.log("Downloading Server")
	await downloadFile(serverUrl, `/home/container/server-${version}.jar`)
	launchApp(cmd);
}


const axios = require('axios');
async function get(path) {
	return (await axios.get(path)).data;
}
