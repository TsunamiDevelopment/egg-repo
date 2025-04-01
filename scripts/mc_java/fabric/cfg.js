module.exports = {
	"id": "mc_java_fabric",
	"friendly_name": "Fabric (Modded)",
	"versions": {
		"1.14.4": "1",
		"1.15.2": "1",
		"1.16.5": "1",
		"1.17.1": "1",
		"1.18.2": "1",
		"1.19.4": "1",
		"1.20.4": "1",
		"1.20.6": "1",
		"1.21.1": "1",
		"1.21.3": "1",
		"1.21.4": "1",
		"1.21.5": "1",
	},
	"runner": {
		"system": "java",
		"version": function(id) {
			if(["1.14.4", "1.15.2", "1.16.5"].includes(id)) return "11.0.25-tem";
			if(["1.17.1", "1.18.2", "1.19.4"].includes(id)) return "17.0.13-tem";
			if(["1.20.4", "1.21.1", "1.21.2", "1.21.3", "1.21.4", "1.21.5"].includes(id)) return "21.0.5-tem";
			return "21.0.5-tem"; // Default to 21.0.5-tem if version is not found
		},
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}