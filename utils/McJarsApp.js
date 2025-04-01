const axios = require("axios");

async function get(software, version) {
    const resp = await axios.get(`https://versions.mcjars.app/api/v1/builds/${software}/${version}/latest`)
    if(!resp.data) throw new Error("Invalid Version")
    return resp.data
}

async function allVersions(software) {
    const resp = await axios.get(`https://versions.mcjars.app/api/v1/builds/${software}`);
    // returns { "success": true, "versions": { "1.8.8": {}, etc, etc }}
    if (!resp.data) throw new Error("Invalid Version");
    const versions = resp.data.versions;
    const versionList = [];

    for (const [versionKey, version] of Object.entries(versions)) {
        if (version.type === "RELEASE") {
            versionList.push(versionKey);
        }
    }

    return versionList;
}

async function parseVersion(software, version) {
    const resp1 = await get(software, version)
    const resp2 = await axios.get('https://versions.mcjars.app/api/v1/version/' + version);

    const isExperimental = resp1.build.experimental || false;
    const isSupported = resp2.version.supported || false;

    return { 
        versionId: resp1.build.versionId,
        buildNumber: resp1.build.buildNumber,
        experimental: isExperimental,
        supported: isSupported
    };
}

async function jarDownloadLink(software, version) {
    const resp = await get(software, version)
    return resp.build.jarUrl
}

async function jarSize(software, version) {
    const resp = await get(software, version)
    return resp.build.jarSize
}

async function jarVersionInfo(software, version) {
    const resp = await get(software, version)
    return `v${resp.build.versionId}b${resp.build.buildNumber}`
}

async function versionJava(software, version) {
    const resp = await axios.get('https://versions.mcjars.app/api/v1/version/' + version);
    if (!resp.data) throw new Error("Invalid Version")
    return resp.data.version.java
}

async function creationDate(software, version) {
    const resp = await get(software, version)
    return resp.build.created
}

module.exports = { jarDownloadLink, jarSize, jarVersionInfo, versionJava, creationDate, allVersions, parseVersion };