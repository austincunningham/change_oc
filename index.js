#!/usr/bin/env node

process.env.UV_THREADPOOL_SIZE = 128;
const colors = require('colors/safe');
const { exec } = require('child_process');
const execsync = require('child_process').execSync;
const fs = require('fs');
// eslint-disable-next-line camelcase
const download_oc = require('./src/download');

console.log(colors.yellow('======================== Check for OC Version Installed ============================='));
console.log(colors.yellow('The folowing versions of oc are installed at /opt/openshift'));

// Check to see if /usr/bin/oc exists
if (execsync('test /usr/bin/oc')) {
  execsync('sudo touch /usr/bin/oc');
}

// Check to see if /opt/openshift exists creates empty dir Installed
if (!fs.existsSync('/opt/openshift/Installed')) {
  execsync('sudo mkdir -p /opt/openshift/Installed');
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
      execsync('sudo rm -rf /opt/openshift/Installed');
      download_oc(() => {
      });
    }
  });
}

startprogram();
