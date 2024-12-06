const child = require("node:child_process");

async function installSdkVersion(version) {
  require('/repo/utils/Logger.js').info(`Installing Java ${version}`);
  const command = `source /home/container/.sdkman/bin/sdkman-init.sh; sdk install java ${version}`;
  const childProcess = child.spawnSync('/bin/bash', ['-c', command], {
	stdio: 'inherit',
  })
}

module.exports = { installSdkVersion }