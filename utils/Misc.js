const { spawn } = require("node:child_process")
function launchApp(cmd) {
	const split = cmd.split(" ")
	const allPast = split.slice(1)
	const app = spawn(split[0], [...allPast], { stdio: 'inherit' });
	app.on('close', (code) => {
		if(code !== 0) throw new Error(`App exited with code ${code}`);
	});
}
function hash256(path) {
	return new Promise((resolve, reject) => {
		const hash = require('crypto').createHash('sha256');
		const rs = require('fs').createReadStream(path);
		rs.on('error', reject);
		rs.on('data', data => hash.update(data));
		rs.on('end', () => resolve(hash.digest('hex')));
	});
}

module.exports = { launchApp, hash256 }