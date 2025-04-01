const { allVersions, parseVersion, versionJava } = require("../../../utils/McJarsApp");

module.exports = {
	"id": "mc_java_paper",
	"friendly_name": "PaperMC",
	"versions": async() => {
		const allVersion = await allVersions();
		const versions = allVersion.filter(v => v.type === "RELEASE");
		const mappedVersions = versions.map(async v => await parseVersion("paper", v))

		const toReturn = {};
		for (const version of await Promise.all(mappedVersions)) {
			let number = 0;
			if(version.supported) number = 1;
			if(version.experimental) number = 2;
			toReturn[version.versionId] = number;
		}

		return toReturn;
	},
	"runner": {
		"system": "java",
		"version": async function(id) {
			const java = await versionJava("paper", id);
			if(java === "21") return "21.0.5-tem";
			if(java === "17") return "17.0.13-tem";
			if(java === "16") return "16.0.2-tem";
			if(java === "11") return "11.0.25-tem";
			if(java === "8") return "8.0.382-tem";
			return "21.0.5-tem"; // Default to 21.0.5-tem if version is not found
		},
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}