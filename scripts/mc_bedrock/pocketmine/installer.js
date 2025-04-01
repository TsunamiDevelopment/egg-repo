const fs = require("fs");

module.exports = async function create(version) {
	const { execSync } = require("child_process");
	execSync("bash -c 'cd /home/container && curl -sL https://get.pmmp.io | bash -s -'", { stdio: "inherit" });

	const cmd = require('./cfg').runner.cmd

	const properties = [
		`language=eng`,
		`motd=MultiEgg Hosted PocketMine-MP Server`,
		`server-port=${process.env.SERVER_PORT}`,
		'server-portv6=0',
		'max-players=20',
		'view-distance=20',
		'white-list=off',
		'enable-query=on',
		'enable-ipv6=off',
		'force-gamemode=off',
		'hardcore=off',
		'pvp=on',
		'difficulty=2',
		'generator-settings=',
		'level-name=world',
		'level-seed=',
		'level-type=default',
		'auto-save=on',
		'xbox-auth=on',
	].join("\n");
	fs.writeFileSync("/home/container/server.properties", properties, { encoding: "utf8" });

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
