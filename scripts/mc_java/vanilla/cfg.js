const { versionsMinecraft, parseJavaVersion } = require("../../../utils/McJarsApp");

module.exports = {
	"id": "mc_java_vanilla",
	"friendly_name": "Vanilla",
	"versions": async function () { return await versionsMinecraft("vanilla"); },
	"runner": {
		"system": "java",
		"version": function(id) { return parseJavaVersion(id); },
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}