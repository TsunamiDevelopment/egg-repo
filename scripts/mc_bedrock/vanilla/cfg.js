module.exports = {
	"id": "mc_bedrock_vanilla",
	"friendly_name": "Vanilla",
	"versions": {
        "latest": 1
    },
	"runner": {
		"system": "system",
		"version": null,
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `LD_LIBRARY_PATH=/home/container /home/container/bedrock_server`
	}
}