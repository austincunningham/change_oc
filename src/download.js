'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const tarball = require('tarball-extract');
const request = require('request');
const fs = require('fs');


function download_oc(){
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
        //console.log(result)
        if (result.version == '3.8') {

          var url = 'https://github.com/openshift/origin/releases/download/v3.9.0/openshift-origin-client-tools-v3.9.0-191fece-linux-64bit.tar.gz'
        
          var promise = new Promise(function(resolve,reject){
              request({
              uri: url,
              method: "GET",
              timeout: 10000,
              followRedirect: true,
              maxRedirects: 10
            }).pipe(fs.createWriteStream(result.version +".tar.gz"))
            resolve('Hello, Promises!');
          });
          
          promise.then((downloadedFile) => {
            fs.exists(result.version +".tar.gz",function(err){
              if(err) {
                console.log("file read error: "+err);
              } else {
                tarball.extractTarball(result.version+".tar.gz", result.version, function(err){
                  if(err) {
                    console.log("tarball error: "+err);
                  } else {
                    console.log("File extracted");
                  }
                });
              }
            });
        }, (error) => {
            console.log(error);
        });
          
          // var promise = new Promise(function(resolve,reject){
          //     request({
          //     uri: url,
          //     method: "GET",
          //     timeout: 10000,
          //     followRedirect: true,
          //     maxRedirects: 10
          //   }).pipe(fs.createWriteStream(result.version +".tar.gz"))
          // })
          // .then(promise => {
          //   console.log("do I get here ??")
          //   fs.exists(result.version +".tar.gz",function(err){
          //     if(err) {
          //       console.log("file read error: "+err);
          //     } else {
          //       console.log("File exists");
          //     }
          //   })
          // })
          // .then(promise => {
          //   tarball.extractTarball(result.version+".tar.gz", result.version, function(err){
          //     if(err) {
          //       console.log("tarball error: "+err);
          //     } else {
          //       console.log("File extracted");
          //     }
          //   })
          // })
          // .catch(err)

          
          // .then(response => exec("tar -xvzf "+ result.version +".tar.gz ./"+result.version)
          // .then(extractfile => {
          //   console.log("Change to Version: ", result.version);
          //   console.log("New Version Number : ",extractfile.stdout);
          //   if (extractfile.stderr){
          //     return extractfile.stderr;
          //   }
          // })
          // ).catch(err);
          
          
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
}
module.exports = download_oc;

