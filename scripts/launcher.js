const fs = require('fs')
const path = require('path')
const { Select } = require('enquirer');

module.exports = async function create() {
	const allDirs = fs.readdirSync(__dirname);
	const dirs = allDirs.filter(dir => fs.statSync(path.join(__dirname, dir)).isDirectory());

	require('../utils/Logger').info("Don't see a game you like? Open")
	require('../utils/Logger').info("an issue on the GitHub repo!")
	require('../utils/Logger').info("https://github.com/TsunamiDevelopment/eggs-repo")
	// Selct menu popup for selecting the server type
	const server = new Select({
		name: 'server',
		message: 'Select the Server Genre',
		choices: dirs
	})
	const serverresp = await server.run();

	const cfg = require(path.join(__dirname, serverresp, 'cfg.js'))();
	const subcat = new Select({
		name: 'server',
		message: 'Select the Server Software',
		choices: cfg.subcategories
	})
	const subcatresp = await subcat.run();

	const serverCfg = require(path.join(__dirname, serverresp, subcatresp, 'cfg.js'))();
	const version = new Select({
		name: 'server',
		message: 'Select the Server Version',
		choices: serverCfg.supported_versions
	})
	const versionresp = await version.run();

	const installer = require(path.join(__dirname, serverresp, subcatresp, 'installer.js'));
	await installer(versionresp);

	
}