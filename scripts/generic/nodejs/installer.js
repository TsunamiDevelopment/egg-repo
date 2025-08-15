module.exports = async function create(version) {
	const sdkVersion = require("./cfg").runner.version(version);

	const cmd = require("./cfg").runner.cmd.replace(
		"{{SDK_VERSION}}",
		sdkVersion
	);

	return {
		sdk: {
			type: "node",
			version: sdkVersion,
		},
		launch: cmd,
	};
};
