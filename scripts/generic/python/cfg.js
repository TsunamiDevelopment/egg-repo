module.exports = {
	id: "generic_python",
	friendly_name: "Python",
	versions: {
		"3.13.7": 1,
		"3.12.11": 1,
		"3.11.13": 1,
		"3.10.18": 1,
		"3.9.23": 1,
		"3.8.20": 1,
		"3.7.17": 1,
		"3.6.15": 1,
		"3.5.10": 1,
		"3.4.10": 1,
		"3.3.7": 1,
		"3.2.6": 1,
		"3.1.5": 1,
		"3.0.1": 1,
	},
	runner: {
		system: "node",
		version: (id) => id,
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		cmd: `/home/container/.pyenv/versions/{{SDK_VERSION}}/bin/python %%__BEFOREFLAGS__%% /home/container/main.py`,
	},
};
