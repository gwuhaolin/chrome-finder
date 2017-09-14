const { execSync, execFileSync } = require('child_process');
const path = require('path');
const { canAccess, sort, newLineRegex } = require('./util');


function findChromeExecutablesForLinuxDesktop(folder) {
  const argumentsRegex = /(^[^ ]+).*/; // Take everything up to the first space
  const chromeExecRegex = '^Exec=\/.*\/(google|chrome|chromium)-.*';

  let installations = [];
  if (canAccess(folder)) {
    // Output of the grep & print looks like:
    //    /opt/google/chrome/google-chrome --profile-directory
    //    /home/user/Downloads/chrome-linux/chrome-wrapper %U
    let execPaths = execSync(`grep -ER "${chromeExecRegex}" ${folder} | awk -F '=' '{print $2}'`)
      .toString()
      .split(newLineRegex)
      .map((execPath) => execPath.replace(argumentsRegex, '$1'));

    execPaths.forEach((execPath) => canAccess(execPath) && installations.push(execPath));
  }

  return installations;
}


/**
 * Look for linux executables in 2 ways
 * 1. Look into the directories where .desktop are saved on gnome based distro's
 * 2. Look for google-chrome-stable & google-chrome executables by using the which command
 */
function linux() {
  let installations = [];

  // 2. Look into the directories where .desktop are saved on gnome based distro's
  const desktopInstallationFolders = [
    path.join(require('os').homedir(), '.local/share/applications/'),
    '/usr/share/applications/',
  ];
  desktopInstallationFolders.forEach(folder => {
    installations = installations.concat(findChromeExecutablesForLinuxDesktop(folder));
  });

  // Look for google-chrome-stable & google-chrome executables by using the which command
  const executables = [
    'google-chrome-stable',
    'google-chrome',
    'chromium',
  ];
  executables.forEach((executable) => {
    try {
      const chromePath =
        execFileSync('which', [executable]).toString().split(newLineRegex)[0];
      if (canAccess(chromePath)) {
        installations.push(chromePath);
      }
    } catch (err) {
      // cmd which not installed.
    }
  });

  const priorities = [
    { regex: /chrome-wrapper$/, weight: 51 }, { regex: /google-chrome-stable$/, weight: 50 },
    { regex: /google-chrome$/, weight: 49 },
  ];

  return sort(Array.from(new Set(installations.filter(Boolean))), priorities);
}

module.exports = linux;
