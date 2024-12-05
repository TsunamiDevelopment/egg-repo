import { downloadFile } from '../../../utils/DownloadFile';

export default async function create(version) {
	const data = await get(`https://api.papermc.io/v2/projects/paper/versions/${version}`)
	if(!data.project_id) throw new Error("Invalid Version");
	const build = data.builds[0];
	const serverUrl = `https://api.papermc.org/v2/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`;

	downloadFile(serverUrl, `/home/container/server-${version}.jar`)
}


import axios from 'axios'
async function get(path) {
	return (await axios.get(path)).data;
}