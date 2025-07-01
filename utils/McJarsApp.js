const axios = require("axios");

let allVersionsCache = {};

async function get(software, version) {
    const resp = await axios.get(`https://versions.mcjars.app/api/v1/builds/${software}/${version}/latest`);
    if (!resp.data) throw new Error("Invalid Version");
    return resp.data;
}

async function allVersions(software) {
    if (!allVersionsCache[software]) {
        const resp = await axios.get(`https://versions.mcjars.app/api/v1/builds/${software}`);
        allVersionsCache[software] = resp.data; // Cache the response data for future use
    }
    
    if (!allVersionsCache[software]) throw new Error("Invalid Version");
    
    const versions = allVersionsCache[software].versions;
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

    if (resp.versions && resp.versions[version]) {
        return resp.versions[version];
    }

    if (!allVersionsCache[software]) {
        await allVersions(software);
    }

    const apiVersions = allVersionsCache[software].versions;
    const versionData = apiVersions[version];
    
    if (!versionData) throw new Error("Invalid Version");
    
    return {
        type: versionData.type,
        java: versionData.java,
        supported: versionData.supported,
        experimental: versionData.latest?.experimental || false,
    };
}

async function jarDownloadLink(software, version) {
    const resp = await get(software, version);
    return resp.build.jarUrl;
}

async function jarSize(software, version) {
    const resp = await get(software, version);
    return resp.build.jarSize;
}

async function jarVersionInfo(software, version) {
    const resp = await get(software, version);
    return `v${resp.build.versionId}b${resp.build.buildNumber}`;
}

async function versionJava(software, version) {
    const versionInfo = await parseVersion(software, version);
    return versionInfo.java;
}

async function creationDate(software, version) {
    const resp = await get(software, version);
    return resp.build.created;
}

async function versionsMinecraft(software) {
    try {
        const versions = await allVersions(software);
        const toReturn = {};

        for (const version of versions) {
            const versionData = await parseVersion(software, version);
            let number = 0;
            if (versionData.supported) number = 1;
            if (versionData.experimental) number = 2;
            toReturn[version] = number;
        }

        return toReturn;
    } catch (error) {
        console.error("Error in versionsMinecraft:", error);
        return {};
    }
}

function parseJavaVersion(java) {
    const javaVersions = {
        "21": "21.0.5-tem",
        "17": "17.0.13-tem",
        "16": "16.0.2-tem",
        "11": "11.0.25-tem",
        "8": "8.0.382-tem"
    };
    return javaVersions[java] || "21.0.5-tem"; // Default to 21.0.5-tem if version is not found
}

module.exports = { 
    jarDownloadLink, 
    jarSize, 
    jarVersionInfo, 
    versionJava, 
    creationDate, 
    allVersions, 
    parseVersion, 
    versionsMinecraft, 
    parseJavaVersion 
};