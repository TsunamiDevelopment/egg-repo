const { default: axios } = require('axios');
const { downloadFile } = require('../../../utils/DownloadFile');
const Logger = require('../../../utils/Logger');
const fs = require('fs');
const { extract } = require('tar-extract');

module.exports = async function create(version) {
	const cmd = require('./cfg').runner.cmd;
	const { execSync } = require('child_process');

	const apiVersion = await axios.get(
		`https://api.github.com/repos/Requarks/wiki/releases/latest`
	);
	const apiVersionData = apiVersion.data.tag_name.replace('v', '');

	Logger.debug('Fetching Wiki.js data from GitHub API...');
	const assets = apiVersion.data.assets.filter(
		(asset) => asset.name == 'wiki-js.tar.gz'
	);
	if (assets.length == 0) {
		Logger.error('No assets found for Wiki.js v' + apiVersionData);
		return;
	}
	const asset = assets[0];
	const assetUrl = asset.browser_download_url;
	const assetName = asset.name;
	const assetDate = new Date(asset.updated_at);

	const assetPath = `/home/container/${assetName}`;
	const assetPathUnzipped = `/home/container`;
	// released x days ago
	Logger.info(
		'Downloading Wiki.js v' +
			apiVersionData +
			' which was released ' +
			Math.floor((Date.now() - assetDate) / (1000 * 60 * 60 * 24)) +
			' days ago'
	);
	await downloadFile(assetUrl, assetPath);
	Logger.info(
		'Extracting Wiki.js v' + apiVersionData + ' to ' + assetPathUnzipped
	);
	await extract(assetPath, assetPathUnzipped);
	fs.renameSync('/home/container/config.sample.yml', '/home/containerconfig.yml');

	Logger.info('Cleaning up...');
	await fs.promises.unlink(assetPath).then(() => {
		const fileSizeInBytes = fs.statSync(assetPath).size;
		const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
		Logger.info(
			`Server TAR downloaded successfully (Size: ${fileSizeInMB} MB)`
		);
	});

	Logger.info('Wiki.js v' + apiVersionData + ' installed successfully');
	Logger.info('Rebuilding SQLite');
	try {
		execSync('npm rebuild sqlite3', { stdio: 'inherit' });
		Logger.info('SQLite3 rebuilt successfully');
	} catch (error) {
		Logger.error('Failed to rebuild SQLite3: ' + error.message);
		throw error;
	}

	return {
		sdk: {
			type: 'node',
			version: 21,
		},
		program: {},
		launch: cmd,
	};
};
