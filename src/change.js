/* eslint-disable max-len */

// 'use strict';
const colors = require('colors/safe');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readlineSync = require('readline-sync');
const fs = require('fs');


// eslint-disable-next-line func-names
function change(callback) {
  console.log(colors.green('================================= Change OC ========================================'));
  console.log(colors.green('Versions Present:'));
  exec('ls /opt/openshift', (stderr, stdout) => {
    if (stderr) {
      console.log(colors.green(stderr));
    } else if (stdout) {
      console.log(colors.green(stdout));
      const version = readlineSync.question(colors.green('What version of oc do you wish to switch to ?'));
      // eslint-disable-next-line eqeqeq
      if (version != 3.7 && version != 3.9 && version != 3.10 && version != 3.11 && version != 4.1 && version != 4.2 && version != 4.3 && version != 4.4) {
        console.log('Version not present');
      } else if (fs.existsSync(`/opt/openshift/${version}`)) {
        console.log('Command-line input received:');
        console.log(`Change to Version : ${version}`);
        exec(`sudo rm /usr/bin/oc && sudo ln -s /opt/openshift/${version}/oc /usr/bin/oc`)
          .then(() => exec('oc version'))
          // eslint-disable-next-line consistent-return
          .then((newVersion) => {
            console.log('New Version Number : ', newVersion.stdout);
            if (newVersion.stderr) {
              return newVersion.stderr;
            }
            if (typeof callback === 'function') {
              callback();
            }
          })
          .catch(Error);
      } else {
        console.log(`Binary version ${version} not extracted`);
      }
    }
  });
}

module.exports = change;
