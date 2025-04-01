module.exports = {
	"id": "mc_bedrock_pocketmine",
	"friendly_name": "PocketMine-MP",
	"versions": {
        "latest": 1
    },
	"runner": {
		"system": "system",
		"version": null,
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/start.sh`
	}
}