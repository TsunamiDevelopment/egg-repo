const { downloadFile } = require('/repo/utils/DownloadFile.js')
const { installSdkVersion } = require('/repo/utils/sdks/java.js')
const { exec } = require('child_process');
const { launchApp, hash256 } = require('/repo/utils/Misc.js')

module.exports = async function create(version) {
	console.log(version)
	const data = await get(`https://api.papermc.io/v2/projects/velocity/versions/${version}`)
	if(!data.project_id) throw new Error("Invalid Version");
	const build = data.builds[data.builds.length - 1];
	const buildData = await get(`https://api.papermc.io/v2/projects/velocity/versions/${version}/builds/${build}`);
	const sha256 = buildData.downloads.application.sha256;
	const serverUrl = `https://api.papermc.io/v2/projects/velocity/versions/${version}/builds/${build}/downloads/${buildData.downloads.application.name}`;

	const sdkVersion = require('./cfg').runner.version(version);
	if(!sdkVersion) throw new Error("Invalid Version");
	const cmd = require('./cfg').runner.cmd.replace("{{VERSION}}", version);

	await installSdkVersion(sdkVersion).catch(e => { throw new Error(e) });
	await exec("mkdir -p /home/container/")
	require('/repo/utils/Logger').info(`Downloading Server v${version}b${build}`)
	if(!require('fs').existsSync(`/home/container/proxy-${version}.jar`)) {
		await downloadFile(serverUrl, `/home/container/proxy-${version}.jar`)
	} else {
		// get sha256 of existing jar
		const existingHash = await hash256(`/home/container/proxy-${version}.jar`);
		if(existingHash !== sha256) {
			require('/repo/utils/Logger').info("Server jar already exists, but is outdated. Updating...")
			await downloadFile(serverUrl, `/home/container/proxy-${version}.jar`)
		}
	}
	launchApp(cmd);
}


const axios = require('axios');
async function get(path) {
	return (await axios.get(path)).data;
}
