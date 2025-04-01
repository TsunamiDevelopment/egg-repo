const { versionsMinecraft, parseJavaVersion } = require("../../../utils/McJarsApp");

module.exports = {
	"id": "mc_proxy_bungeecord",
	"friendly_name": "BungeeCord",
	"versions": async function () { return await versionsMinecraft("bungeecord"); },
	"runner": {
		"system": "java",
		"version": function(id) { return parseJavaVersion(id); },
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}