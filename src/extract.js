'use strict';
const prompt = require('prompt');
const colors = require('colors/safe');
const util = require('util');
//const exec = util.promisify(require('child_process').exec);
const tarball = require('tarball-extract');
//const request = require('request');
const fs = require('fs');


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
});