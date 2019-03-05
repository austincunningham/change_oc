
//'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readlineSync = require('readline-sync');
const fs = require('fs');


let child;


var change = function(callback){
  prompt.start();
  prompt.message = colors.green('-->');
  prompt.delimiter = colors.green(':');

  console.log(colors.green("================================= Change OC ========================================"));
  var version = readlineSync.question(colors.green('What version of oc do you wish to switch to ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n'));
  if (version != 3.7 && version !=  3.9 && version !=  3.10 && version !=  3.11){
    console.log("Version not present");
  } else {
    if (fs.existsSync("/opt/openshift/"+version)) {
      console.log("Command-line input received:");
      console.log('Change to Version : ' + version);
      
      exec("sudo rm /usr/bin/oc && sudo ln -s /opt/openshift/"+version+"/oc /usr/bin/oc")
      .then(changeToVersion => exec("oc version"))
      .then(newVersion => {
        console.log("New Version Number : ",newVersion.stdout);
        if (newVersion.stderr){
          return newVersion.stderr;
        }

        if (typeof callback === 'function') {
          callback();
        }
      })
      .catch(Error)
    } else {
      console.log("Binary version "+version+" not extracted");
      return;
    }
  }
}

module.exports = change;

