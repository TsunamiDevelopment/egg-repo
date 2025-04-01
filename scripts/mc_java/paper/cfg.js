import { versionJava, versionsMinecraft } from "../../../utils/McJarsApp";

module.exports = {
	"id": "mc_java_paper",
	"friendly_name": "PaperMC",
	"versions": async function () { return await versionsMinecraft("paper"); },
	"runner": {
		"system": "java",
		"version": function(id) { return versionJava(id); },
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
};