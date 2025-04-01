const { parseJavaVersion } = require("../../../utils/McJarsApp");

module.exports = {
	"id": "voice_server_lavalink",
	"friendly_name": "Lavalink",
	"versions": {
        "latest": 1
    },
	"runner": {
		"system": "java",
		"version": function(id) { return parseJavaVersion("17.0.13-tem"); },
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java -jar /home/container/Lavalink.jar`,
	}
}