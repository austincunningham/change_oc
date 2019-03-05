#!/usr/bin/env node

const prompt = require('prompt');
const colors = require('colors/safe');
const { exec } = require('child_process');
const execsync = require('child_process').execSync;
const fs = require('fs');
// eslint-disable-next-line camelcase
const download_oc = require('./src/download');

prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');

console.log(colors.yellow('======================== Check for OC Version Installed ============================='));
console.log(colors.yellow('The folowing versions of oc are installed at /opt/openshift'));

// Check to see if /usr/bin/oc exists
if (!fs.existsSync('/usr/bin/oc')) {
  execsync('sudo touch /usr/bin/oc');
}

// Check to see if /opt/openshift exists
if (!fs.existsSync('/opt/openshift')) {
  execsync('sudo mkdir -p /opt/openshift/None_installed');
}

function startprogram() {
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

startprogram();
