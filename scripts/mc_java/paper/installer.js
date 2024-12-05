const { downloadFile } = require('/repo/utils/DownloadFile.js')
const { exec } = require('child_process');

module.exports = async function create(version) {
	const data = await get(`https://api.papermc.io/v2/projects/paper/versions/${version}`)
	if(!data.project_id) throw new Error("Invalid Version");
	const build = data.builds[0];
	const serverUrl = `https://api.papermc.io/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`;

	const sdkVersion = require('./cfg')().runner.version(version);
	if(!sdkVersion) throw new Error("Invalid Version");
	const cmd = require('./cfg')().runner.cmd.replace("{{VERSION}}", version);

	exec(`/bin/bash -c "source /home/container/.sdkman/bin/sdkman-init.sh; sdk install java ${sdkVersion}"`, async (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			console.error(stderr);
			console.error(stdout);
			throw new Error("Failed to install Java");
		}
		await downloadFile(serverUrl, `/home/container/server-${version}.jar`)

		exec(cmd, (err, stdout, stderr) => {
			if (err) {
				console.error(err);
				console.error(stderr);
				console.error(stdout);
				throw new Error("Failed to start server");
			}
		})
	})


}


const axios = require('axios');
async function get(path) {
	return (await axios.get(path)).data;
}