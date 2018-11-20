
'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tarball = require('tarball-extract');
const request = require('request');
const fs = require('fs');



let child;


prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');
 
//
// get the version number
//
console.log(colors.blue("Do you wish to install an oc binary yes/no ?"));
prompt.get(['yesNo'], function (err, result){
  console.log(result.yesNo)
  if (result.yesNo == "yes" || result.yesNo == "y"){
    console.log(colors.blue('What version of oc do you wish to install ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n'));
    prompt.get(['version'], function (err, result){
      console.log(result)
      if (result.version == '3.8') {
        // exec("mkdir -p ./"+result.version, function(stdout, stderr, error){
        //   console.log("stdout: ",stdout,stderr,error)
        // });

        var url = 'https://github.com/openshift/origin/releases/download/v3.9.0/openshift-origin-client-tools-v3.9.0-191fece-linux-64bit.tar.gz'
       
        request({
          uri: url,
          method: "GET",
          timeout: 10000,
          followRedirect: true,
          maxRedirects: 10
        }, function(error, response, body) {
          if(response){
            console.log("Download successful");
          }
        }).pipe(fs.createWriteStream(result.version +".tar.gz"))
        
        // tarball.extractTarball(result.version+".tar.gz", result.version, function(err){
        //   if(err) {
        //     console.log("tarball error: "+err);
        //   }
        // })
        // ).catch(err);
      }
    });
  } else {
    console.log("do i hit here")
    return;
  }
});


//console.log(colors.green('What version of oc do you wish to switch to ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n'));
//prompt.get(['version'], function (err, result) {
//   if (result.version != 3.7 && result.version !=  3.9 && result.version !=  3.10 && result.version !=  3.11){
//       console.log("Version not present")
//   } else {
//     console.log("Command-line input received:");
//     console.log('Change to Version : ' + result.version);
    
//     exec("sudo rm /usr/local/bin/oc && sudo ln -s /opt/openshift/"+result.version+"/oc /usr/local/bin/oc")
//     .then(changeToVersion => exec("oc version"))
//     .then(newVersion => {
//       console.log("Change to Version: ", result);
//       console.log("New Version Number : ",newVersion.stdout);
//       if (newVersion.stderr){
//         return newVersion.stderr;
//       }
//     })
//     .catch(err);
//   }
//});
