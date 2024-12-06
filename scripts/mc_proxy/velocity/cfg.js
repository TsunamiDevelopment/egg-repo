module.exports = {
	"id": "mc_proxy_velocity",
	"friendly_name": "Velocity",
	"versions": {
		"3.1.0": "0",
		"3.1.1": "1",
		"3.1.1-SNAPSHOT": "2",
		"3.1.2-SNAPSHOT": "2",
		"3.2.0-SNAPSHOT": "2",
		"3.3.0-SNAPSHOT": "2",
		"3.4.0-SNAPSHOT": "2",
	},
	"runner": {
		"system": "java",
		"version": (id) => "21.0.5-tem",
		"cmd": `/home/container/.sdkman/candidates/java/current/bin/java -jar /home/container/proxy-{{VERSION}}.jar`
	}
}