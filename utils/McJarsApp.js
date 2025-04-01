const axios = require("axios");

let allVersionsCache = {};

async function get(software, version) {
    const resp = await axios.get(`https://versions.mcjars.app/api/v1/builds/${software}/${version}/latest`)
    if(!resp.data) throw new Error("Invalid Version")
    return resp.data
}

async function allVersions(software) {
    const resp = allVersionsCache[software] || await axios.get(`https://versions.mcjars.app/api/v1/builds/${software}`);
    allVersionsCache[software] = resp; // Cache the response for future use
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
    const resp = (await axios.get(`https://raw.githubusercontent.com/TsunamiDevelopment/egg-repo/refs/heads/main/versions.json`)).data;
    if (!resp) throw new Error("Invalid Version");

    const versions = resp.versions;
    let versionDoc = versions[version]
    if (!versionDoc) {
        const d = allVersionsCache[software] || await allVersions(software);
        allVersionsCache[software] = d; // Cache the response for future use
        const versions = d.data.versions;
        for (const [versionKey, version] of Object.entries(versions)) {
            if (versionKey === version) {
                versionDoc = {
                    type: version.type,
                    java: version.java,
                    supported: version.supported,
                    experimental: version.latest.experimental,
                };
                break;
            }
        }
        if (!versionDoc) throw new Error("Invalid Version")
    }

    return versionDoc;
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