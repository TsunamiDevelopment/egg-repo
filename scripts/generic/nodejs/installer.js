module.exports = async function create(version) {
	const version = require("./cfg").runner.version(version);

	const cmd = require("./cfg").runner.cmd.replace("{{SDK_VERSION}}", version);

	return {
		sdk: {
			type: "node",
			version,
		},
		launch: cmd,
	};
};
