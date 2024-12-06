const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Logger = require('../utils/Logger');
const chalk = require('chalk');

module.exports = async function create() {
    const dirs = getDirectories(__dirname);
    logInfo();

    const server = await selectMenu('🎮   Select the Server Genre', dirs);
    const serverCfgPath = path.join(__dirname, server, 'cfg.js');
    const serverCfg = require(serverCfgPath);

    const subcat = await selectMenu('🖥️   Select the Server Software', serverCfg.subcategories);
    const subcatCfgPath = path.join(__dirname, server, subcat, 'cfg.js');
    const subcatCfg = require(subcatCfgPath);

    const versionChoices = mapVersions(subcatCfg.versions);
    const version = await selectMenu('🔧   Select the Server Version', versionChoices);

    const installer = require(path.join(__dirname, server, subcat, 'installer.js'));
    await installer(version);
};

function getDirectories(dir) {
    const allDirs = fs.readdirSync(dir);
    return allDirs.filter(subDir => fs.statSync(path.join(dir, subDir)).isDirectory());
}

function logInfo() {
    Logger.info(chalk.blueBright("Don't see a game you like? Open"));
    Logger.info(chalk.blueBright("an issue on the GitHub repo!"));
    Logger.info(chalk.blueBright("https://github.com/TsunamiDevelopment/eggs-repo"));
}

function selectMenu(message, choices) {
    return new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        console.log(chalk.cyanBright(`\n\n${message}:`));
        choices.forEach((choice, index) => {
            console.log(`${chalk.greenBright(index + 1)}) ${choice.message || choice}`);
        });

        rl.question(chalk.yellow('Your choice: '), (answer) => {
            const selectedIndex = parseInt(answer, 10) - 1;

            if (selectedIndex >= 0 && selectedIndex < choices.length) {
                const selectedChoice = choices[selectedIndex].value || choices[selectedIndex];
                rl.close();
                resolve(selectedChoice);
            } else {
                console.log(chalk.red('Invalid choice. Please try again.'));
                rl.close();
                resolve(selectMenu(message, choices));
            }
        });
    });
}

function mapVersions(versions) {
    const mapped = [];
    for (const version in versions) {
        const status = versions[version];
        let statusText, color;
        switch (status) {
            case "-1":
                color = chalk.redBright;
                statusText = "Dangerous";
                break;
            case "0":
                color = chalk.hex('#FFA500');
                statusText = "Unsupported";
                break;
            case "1":
                color = chalk.greenBright;
                statusText = "Stable";
                break;
            case "2":
                color = chalk.magentaBright;
                statusText = "Experimental";
                break;
        }
        mapped.push({
            message: color(`${version} (${statusText})`),
            value: version,
			level: status
        });
    }
    return mapped;
}
