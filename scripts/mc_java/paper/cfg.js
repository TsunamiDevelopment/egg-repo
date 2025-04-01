const { allVersions, parseVersion, versionJava } = require("../../../utils/McJarsApp");

module.exports = {
	"id": "mc_java_paper",
	"friendly_name": "PaperMC",
	"versions": async() => {
		try {
			const versions = await allVersions("paper");
			const mappedVersions = await Promise.all(versions.map(async v => ({ v, d: await parseVersion("paper", v) })));

			const toReturn = {};
			for (const version of mappedVersions) {
				let number = 0;
				if (version.d.supported) number = 1;
				if (version.d.experimental) number = 2;
				toReturn[version.v] = number;
			}
			console.log("Versions fetched successfully:", toReturn);

			return toReturn;
		} catch (error) {
			console.error("Error fetching versions:", error);
			return {};
		}
	},
	"runner": {
		"system": "java",
		"version": async function(id) {
			try {
				const java = await versionJava("paper", id);
				if (java === "21") return "21.0.5-tem";
				if (java === "17") return "17.0.13-tem";
				if (java === "16") return "16.0.2-tem";
				if (java === "11") return "11.0.25-tem";
				if (java === "8") return "8.0.382-tem";
				return "21.0.5-tem"; // Default to 21.0.5-tem if version is not found
			} catch (error) {
				console.error("Error fetching Java version:", error);
				return "21.0.5-tem"; // Default to 21.0.5-tem in case of error
			}
		},
		// %%__VAR__%% are launcher-replaced flags, {{VAR}} are installer-replaced flags
		"cmd": `/home/container/.sdkman/candidates/java/{{JDK_VERSION}}/bin/java %%__BEFOREFLAGS__%% -jar /home/container/server-{{VERSION}}.jar`
	}
}