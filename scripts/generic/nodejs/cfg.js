module.exports = {
	id: "generic_nodejs",
	friendly_name: "NodeJS",
	versions: {
		"24.6.0": 1,
		"23.11.1": 1,
		"22.18.0": 1,
		"20.19.4": 1,
	},
	runner: {
		system: "node",
		version: (id) => id,
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		cmd: `/home/container/.nvm/versions/node/{{SDK_VERSION}}/bin/node %%__BEFOREFLAGS__%% /home/container/`,
	},
};
