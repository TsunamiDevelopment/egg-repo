module.exports = async function create(version) {
    const { spawn } = require("child_process");
	spawn("bash", ["-c", "curl -sL https://get.pmmp.io | bash -s -"], { stdio: "inherit" });

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
