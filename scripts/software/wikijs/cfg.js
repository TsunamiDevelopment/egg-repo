module.exports = {
	"id": "software_wikijs",
	"friendly_name": "Wiki.js",
	"versions": {
		"latest": 1
	},
	"runner": {
		"system": "node",
		"version": function(id) { return 21; },
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `node /home/container/wikijs/server`
	}
}
