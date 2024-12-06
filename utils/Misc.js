const { spawn } = require("node:child_process")
function launchApp(cmd) {
	const split = cmd.split(" ")
	const allPast = split.slice(1)
	const app = spawn(split[0], [...allPast], { stdio: 'inherit' });
	app.on('close', (code) => {
		if(code !== 0) throw new Error(`App exited with code ${code}`);
	});
}

module.exports = { launchApp }