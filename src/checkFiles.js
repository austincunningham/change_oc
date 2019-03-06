const colors = require('colors/safe');
const { exec } = require('child_process');
const execsync = require('child_process').execSync;
const fs = require('fs');
// eslint-disable-next-line camelcase
const download_oc = require('./download');


function checkUsrBinOc() {
  // Check to see if /usr/bin/oc exists
  if (!fs.existsSync('/usr/bin/oc')) {
    execsync('sudo touch /usr/bin/oc');
  }
}

function checkOptOpenshift() {
// Check to see if /opt/openshift exists
  if (!fs.existsSync('/opt/openshift')) {
    execsync('sudo mkdir -p /opt/openshift/None_installed');
  }
}

function checkVersions() {
  exec('ls /opt/openshift', (error, stdout, stderr) => {
    if (error) {
      console.log('error :', error);
    }
    if (stderr) {
      console.log('stderr', stderr);
    }
    console.log(colors.yellow(stdout));

    if (stdout) {
      execsync('sudo rm -rf /opt/openshift/None_installed');
      download_oc(() => {
      });
    }
  });
}

function checkFiles() {
  console.log(colors.yellow('======================== Check for OC Version Installed ============================='));
  console.log(colors.yellow('The folowing versions of oc are installed at /opt/openshift'));

  checkUsrBinOc();

  checkOptOpenshift();

  checkVersions();
}


module.exports = checkFiles;
