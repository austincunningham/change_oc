/* eslint-disable camelcase */


const colors = require('colors/safe');
const exec = require('child_process').execSync;
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
      exec(`mkdir ${version}`);
      exec(`tar --warning=no-unknown-keyword -C ${version} -zxvf ${version}.tar.gz`);

      // move the files and remove the old directory
      if (!fs.existsSync(`/opt/openshift/${version}`)) {
        // as version 4x tar is not creating same directory structure
        if (version !== '4.1' && version != '4.2' && version != '4.3') {
          const versionpath = `./${version}/${ocpath}${version}*/*`;
          exec(`mv ${versionpath} ./${version}`);
          exec(`${'rm -rf ./'}${version}/${ocpath}${version}*`);
        }
        // move extracted directroy
        exec(`sudo mv ./${version} /opt/openshift/${version}`);
        console.log(change);
        change();
      } else {
        console.log(`/opt/openshift/${version} exists already`);
        exec(`rm -rf ./${version}`);
        change();
      }
    }

    if (typeof callback === 'function') {
      callback();
    }
  });
};
module.exports = extract_oc;
