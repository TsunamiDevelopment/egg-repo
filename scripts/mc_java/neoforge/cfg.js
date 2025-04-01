module.exports = {
	"id": "mc_java_neoforge",
	"friendly_name": "NeoForge (Modded)",
	"versions": {
		"1.20.4": "1",
		"1.20.6": "1",
		"1.21.1": "1",
		"1.21.2": "1",
		"1.21.3": "1",
		"1.21.4": "1",
		"1.21.5": "1",
	},
	"runner": {
		"system": "java",
		"version": function(id) {
			if(["1.20.4", "1.20.6", "1.21.1", "1.21.2", "1.21.3", "1.21.4", "1.21.5"].includes(id)) return "21.0.5-tem";
			return "21.0.5-tem"; // Default to 21.0.5-tem if version is not found
		},
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}