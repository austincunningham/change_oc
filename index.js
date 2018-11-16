
'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const exec = require('child_process').exec;

let child;


prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');
 
//
// get the version number
//
console.log('What version of oc do you wish to switch to ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n')
prompt.get(['version'], function (err, result) {
  if (result.version != 3.7 && result.version !=  3.9 && result.version !=  3.10 && result.version !=  3.11){
      console.log("Version not present")
  } else {
    console.log("Command-line input received:");
    console.log('  Version : ' + result.version);
    exec("sudo rm /usr/local/bin/oc && sudo ln -s /opt/openshift/"+result.version+"/oc /usr/local/bin/oc", function (error, stdout, stderr) {
        if(stdout){console.log('stdout: ' + stdout);}
        if(stderr){console.log('stderr: ' + stderr);}
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    exec("oc version", function (error, stdout, stderr) {
        if(stdout){console.log('stdout: ' + stdout);}
        if(stderr){console.log('stderr: ' + stderr);}
        if (error !== null) {
          console.log('exec error: ' + error);
        }
    });
    
  }
});
