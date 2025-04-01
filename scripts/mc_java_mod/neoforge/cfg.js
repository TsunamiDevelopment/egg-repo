const { versionsMinecraft } = require("../../../utils/McJarsApp");

module.exports = {
	"id": "mc_java_neoforge",
	"friendly_name": "NeoForge (Modded)",
	"versions": await versionsMinecraft("neoforge"),
	"runner": {
		"system": "java",
		"version": function(id) { return versionJava(id); },
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}