module.exports = {
	"id": "voice_server_teamspeak",
	"friendly_name": "TeamSpeak",
	"versions": {
        "latest": 1
    },
	"runner": {
		"system": "system",
		"version": null,
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/ts3server license_accepted=1 inifile=/home/container/ts3server.ini`
	}
}