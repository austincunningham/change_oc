'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const request = require('request');
const fs = require('fs');
const readlineSync = require('readline-sync');


let child;


prompt.start();
prompt.message = colors.green('-->');
prompt.delimiter = colors.green(':');

//
// get the version number
//

var download_oc=(function(){
  let url;
  console.log("================================= Download OC =======================================")
  let result = readlineSync.question(colors.blue("Do you wish to install an oc binary yes/no ?"));
  if (result == "yes" || result == "y"){
    let version = readlineSync.question(colors.blue('What version of oc do you wish to install ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n'));
    switch(version) {
      case "3.7":
          url = "https://github.com/openshift/origin/releases/download/v3.7.2/openshift-origin-client-tools-v3.7.2-282e43f-linux-64bit.tar.gz"
          break;
      case "3.9":
          url = 'https://github.com/openshift/origin/releases/download/v3.9.0/openshift-origin-client-tools-v3.9.0-191fece-linux-64bit.tar.gz';
          break;
      case "3.10":
          url = "https://github.com/openshift/origin/releases/download/v3.10.0/openshift-origin-client-tools-v3.10.0-dd10d17-linux-64bit.tar.gz"
          break;
      case "3.11":
          url = "https://github.com/openshift/origin/releases/download/v3.11.0/openshift-origin-client-tools-v3.11.0-0cbc58b-linux-64bit.tar.gz"
          break;
      default:
          url = false;
          console.log("No binary present");
          break;
    }
    console.log ("url:",url)
    if(url != "Not Present") {
      let promise = new Promise(function(resolve,reject){
          request({
          uri: url,
          method: "GET",
          timeout: 10000,
          followRedirect: true,
          maxRedirects: 10
        }).pipe(fs.createWriteStream(version +".tar.gz"))
        resolve('Hello, Promises!');
      });
      
      return result.version;
    }     
  }  
})();

module.exports = download_oc;

