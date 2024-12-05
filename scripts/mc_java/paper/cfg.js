module.exports = function data() {
	return {
		"id": "mc_java_paper",
		"friendly_name": "PaperMC",
		"supported_versions": [
			"1.8.8",
			"1.9.4",
			"1.10.2",
			"1.11.2",
			"1.12.2",
			"1.13.2",
			"1.14.4",
			"1.15.2",
			"1.16.5",
			"1.17.1",
			"1.18.2",
			"1.19.4",
			"1.20.4",
			"1.21.1",
			"1.21.2",
			"1.21.3",
			"1.21.4"
		],
		"runner": {
			"system": "java",
			"version": function(id) {
				if(id === ("1.8.8" || "1.9.4" || "1.10.2" || "1.11.2" || "1.12.2" || "1.13.2")) return "8.0.432-tem";
				if(id === ("1.14.4" || "1.15.2" || "1.16.5")) return "11.0.25-tem";
				if(id === ("1.17.1" || "1.18.2" || "1.19.4")) return "17.0.13-tem";
				if(id === ("1.20.4" || "1.21.1" || "1.21.2" || "1.21.3" || "1.21.4")) return "21.0.5-tem";
			},
			"cmd": `java -jar server-{{VERSION}}.jar`
		}
	}
}