module.exports = {
	"id": "mc_java_paper",
	"friendly_name": "PaperMC",
	"versions": {
		"1.8.8": "-1",
		"1.9.4": "-1",
		"1.10.2": "-1",
		"1.11.2": "-1",
		"1.12.2": "0",
		"1.13.2": "0",
		"1.14.4": "0",
		"1.15.2": "0",
		"1.16.5": "0",
		"1.17.1": "1",
		"1.18.2": "1",
		"1.19.4": "1",
		"1.20.4": "1",
		"1.21.1": "2",
		"1.21.2": "2",
		"1.21.3": "2",
		"1.21.4": "2"
	},
	"runner": {
		"system": "java",
		"version": function(id) {
			if(["1.8.8", "1.9.4", "1.10.2", "1.11.2", "1.12.2", "1.13.2"].includes(id)) return "8.0.432-tem";
			if(["1.14.4", "1.15.2", "1.16.5"].includes(id)) return "11.0.25-tem";
			if(["1.17.1", "1.18.2", "1.19.4"].includes(id)) return "17.0.13-tem";
			if(["1.20.4", "1.21.1", "1.21.2", "1.21.3", "1.21.4"].includes(id)) return "21.0.5-tem";
		},
		"cmd": `/home/container/.sdkman/candidates/java/current/bin/java -jar /home/container/server-{{VERSION}}.jar`
	}
}