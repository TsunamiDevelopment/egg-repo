module.exports = async function create(version) {
	const { execSync } = require("child_process");
	execSync("bash -c 'cd /home/container && curl -sL https://get.pmmp.io | bash -s -'", { stdio: "inherit" });

	const cmd = require('./cfg').runner.cmd

	return {
		sdk: {
			type: "system",
			version: null
		},
		program: {
			eulaMsg: "Do you agree to the Minecraft EULA?",
			eulaFile: "eula.txt",
			agreeData: "eula=true"
		},
		launch: cmd
	};
};
