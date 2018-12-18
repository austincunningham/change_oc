'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
//const exec = util.promisify(require('child_process').exec);
const tarball = require('tarball-extract');
//const request = require('request');
const fs = require('fs');
const download_oc = require('./download');
const readlineSync = require('readline-sync');

var extract_oc = function (callback){
    let version = readlineSync.question(colors.blue('What version of oc do you wish to install ? \n - 3.7\n - 3.9\n - 3.10\n - 3.11\n'));
    console.log("download version",version);
    console.log("================================= Extract OC =======================================")
    fs.exists("../"+version +".tar.gz",function(err){
        if(err) {
            console.log("file read error: "+err);
        } else {
            tarball.extractTarball(version+".tar.gz", version, function(error){
                console.log("don i get here")
                if(error) {
                console.log("tarball error: "+error);
                } else {
                console.log("File extracted");
                }
            });
        }

        if (typeof callback === 'function') {
            callback();
        }    
    });
};
module.exports = extract_oc;

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
