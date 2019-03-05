/* eslint-disable camelcase */


const colors = require('colors/safe');
const exec = require('child_process').execSync;
const tarball = require('tarball-extract');
const fs = require('fs');
// eslint-disable-next-line camelcase
const download_oc = require('./download');
const change = require('./change');

const ocpath = 'openshift-origin-client-tools-v';

// eslint-disable-next-line func-names
const extract_oc = function (callback) {
  console.log(colors.cyan('================================= Extract OC ======================================='));
  console.log('download version: ', download_oc.version);
  const { version } = download_oc;
  fs.exists(`../${version}.tar.gz`, (err) => {
    if (err) {
      console.log(`file read error: ${err}`);
    } else {
      tarball.extractTarball(`${version}.tar.gz`, version, (error) => {
        if (error) {
          console.log(`tarball error: ${error}`);
        } else {
          console.log('File extracted');

          // move the files and remove the old directory
          if (!fs.existsSync(`/opt/openshift/${version}`)) {
            const versionpath = `./${version}/${ocpath}${version}*/*`;
            exec(`mv ${versionpath} ./${version}`);
            exec(`${'rm -rf ./'}${version}/${ocpath}${version}*`);
            exec(`sudo mv ./${version} /opt/openshift/${version}`);
            console.log(change);
            change(() => {
              console.log(`oc version changed to :${version}`);
            });
          } else {
            console.log(`/opt/openshift/${version} exists already`);
            exec(`rm -rf ./${version}`);
            change(() => {
              console.log(`oc version changed to :${version}`);
            });
          }
        }
      });
    }

    if (typeof callback === 'function') {
      callback();
    }
  });
};
module.exports = extract_oc;
